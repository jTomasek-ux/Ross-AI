import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { PDFParse } from "pdf-parse";
import { buildLegalPrompt } from "@/lib/prompts";

export const dynamic = "force-dynamic";

const MAX_CHARS = 15000;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is not configured. Add OPENAI_API_KEY to .env.local in the project root, then restart the dev server.",
      },
      { status: 503 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Please upload a PDF contract." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          error:
            "Only PDF files are supported. Please upload a .pdf contract.",
        },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Please upload a PDF under 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let contractText: string;
    try {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      await parser.destroy();
      contractText = result.text?.trim() ?? "";
    } catch {
      return NextResponse.json(
        {
          error:
            "Could not read the PDF. Please ensure it contains selectable text (not a scanned image).",
        },
        { status: 422 }
      );
    }

    if (contractText.length < 100) {
      return NextResponse.json(
        {
          error:
            "The PDF appears to contain no readable text. Please upload a text-based PDF.",
        },
        { status: 422 }
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
          { status: 502 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenAI rate limit reached. Please wait a moment and try again.",
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
