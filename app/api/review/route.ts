import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildLegalPrompt } from "@/lib/prompts";
import { extractPdfText } from "@/lib/extractPdfText";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";
// Extend the serverless function timeout to 60s (Vercel Hobby supports up to 60s).
// PDF parsing + GPT-4o streaming can exceed the default 10s limit.
export const maxDuration = 60;

const MAX_CHARS = 15000;
// Vercel serverless request body limit is 4.5 MB on Hobby/Pro.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const PDF_MAGIC = "%PDF-";

function rateLimitHeaders(result: ReturnType<typeof checkRateLimit>) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetIn),
  };
}

export async function POST(request: NextRequest) {
  // --- Rate limiting ---
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip);

  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: `Too many requests. Please wait ${rl.resetIn} seconds before trying again.`,
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(rl),
          "Retry-After": String(rl.resetIn),
        },
      }
    );
  }

  // --- API key guard ---
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is not configured. Locally: add OPENAI_API_KEY to .env.local. On Vercel: add OPENAI_API_KEY under Project → Settings → Environment Variables and enable it for Production, then redeploy.",
      },
      { status: 503, headers: rateLimitHeaders(rl) }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Please upload a PDF contract." },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    // MIME type check (client-provided, used as first filter only)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported. Please upload a .pdf contract." },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error:
            "File too large. Please upload a PDF under 4MB (Vercel serverless limit).",
        },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Magic bytes check — verifies the file is actually a PDF regardless of
    // what the client claims in Content-Type
    const magic = buffer.slice(0, 5).toString("ascii");
    if (magic !== PDF_MAGIC) {
      return NextResponse.json(
        { error: "File is not a valid PDF. Please upload a genuine PDF contract." },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    let contractText: string;
    try {
      contractText = await extractPdfText(buffer);
    } catch (pdfError) {
      console.error("[/api/review] PDF extraction failed:", pdfError);
      return NextResponse.json(
        {
          error:
            "Could not read the PDF. Please ensure it contains selectable text (not a scanned image).",
        },
        { status: 422, headers: rateLimitHeaders(rl) }
      );
    }

    if (contractText.length < 100) {
      return NextResponse.json(
        {
          error:
            "The PDF appears to contain no readable text. Please upload a text-based PDF.",
        },
        { status: 422, headers: rateLimitHeaders(rl) }
      );
    }

    const truncatedText = contractText.slice(0, MAX_CHARS);

    const openaiStream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: buildLegalPrompt() },
        { role: "user", content: truncatedText },
      ],
      stream: true,
      max_tokens: 1500,
      temperature: 0.2,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of openaiStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (streamError) {
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
      cancel() {
        openaiStream.controller.abort();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
        ...rateLimitHeaders(rl),
      },
    });
  } catch (error) {
    console.error("[/api/review]", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          {
            error:
              "Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local.",
          },
          { status: 502, headers: rateLimitHeaders(rl) }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          {
            error: "OpenAI rate limit reached. Please wait a moment and try again.",
          },
          { status: 429, headers: rateLimitHeaders(rl) }
        );
      }
      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 502, headers: rateLimitHeaders(rl) }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500, headers: rateLimitHeaders(rl) }
    );
  }
}
