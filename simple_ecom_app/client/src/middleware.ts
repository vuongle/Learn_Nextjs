import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sesseionToken = request.cookies.get("sessionToken")?.value;
  const { pathname } = request.nextUrl;

  // not login -> redirect to login
  if (privatePaths.includes(pathname) && !sesseionToken) {
    console.log("not login -> redirect to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // logged in -> redirect to profile
  if (authPaths.includes(pathname) && sesseionToken) {
    console.log(" login -> redirect to profile");
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...privatePaths, ...authPaths],
};
