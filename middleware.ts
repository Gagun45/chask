import NextAuth from "next-auth";
import authConfig from "./utils/auth.config";
import { authRoutes, protectedRoutes } from "./config/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (!isLoggedIn && isProtectedRoute)
    return NextResponse.redirect(new URL("/login", req.nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
