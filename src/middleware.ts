import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const admin = request.cookies.get('admin')?.value === "true";
    
    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        return NextResponse.next();
    }

    if (!token) {
        if (pathname !== '/signin') {
            url.pathname = "/signin";
            return NextResponse.redirect(url);
        }
    } else {
        // Token exists
        if (!admin && pathname.startsWith("/admin")) {
            console.log('not admin');
            
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!signin|api|_next/static|_next/image|favicon.ico).)*",
        "/admin/:path*"
    ],
};