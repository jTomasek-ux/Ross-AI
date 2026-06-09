import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("docs.")) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    if (!pathname.startsWith("/docs")) {
      url.pathname =
        pathname === "/" ? "/docs" : `/docs${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
