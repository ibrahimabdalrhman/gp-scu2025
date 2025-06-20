import { NextResponse } from "next/server";

export function middleware(request: any) { 
  const url = new URL(request.url);
  const token = request.cookies.get('authToken')?.value; 
  const isAuth = !!token;
  const pathname = url.pathname;

  if (!isAuth && [ "/checkout" , "/success-payment"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (isAuth && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/checkout", "/login", "/register" , "/success-payment"],
};
