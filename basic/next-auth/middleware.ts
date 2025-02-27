export { auth as middleware } from "~/auth";

export const config = {
  // next-auth middleware will be applied to all routes that excepts the following routes
  // such as: /api, /_next/static, /_next/image
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
