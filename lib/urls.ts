export function getDocsHref(): string {
  return process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs";
}
