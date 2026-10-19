import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminAuthCookie = request.cookies.get("admin-auth")?.value;

  if (adminAuthCookie !== "true") {
    const loginUrl = new URL("/owner/login", request.url);

    loginUrl.searchParams.set("from", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/member-update"],
};