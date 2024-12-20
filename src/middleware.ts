import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const admin = request.cookies.get("admin")?.value === "true" ? true : false;

    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        return NextResponse.next();
    }

    if (token && (pathname === "/signin" || pathname === "/signup")) {
        console.log("Redirecting to dashboard of ", admin ? "/admin" : "/user");
        url.pathname = admin ? "/admin" : "/user";
        return NextResponse.redirect(url);
    }

    if (!token) {
        if (pathname !== "/signin" && pathname !== "/signup") {
            url.pathname = "/signin";
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (pathname.startsWith("/admin")) {
        if (!admin) {
            console.log("Attempted admin access by non-admin user");
            url.pathname = "/user";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).):path*",
        "/admin/:path*",
        "/user/:path*"
    ]
};
