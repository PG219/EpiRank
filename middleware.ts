import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export function middleware(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ["/login", "/forgot-password"];

    const isPublic = publicRoutes.includes(pathname);

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
