import { DOCS_URL } from "@/lib/site";

export function getDocsHref(): string {
  if (process.env.NEXT_PUBLIC_DOCS_URL) {
    return process.env.NEXT_PUBLIC_DOCS_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "/docs";
  }

  return DOCS_URL;
}
