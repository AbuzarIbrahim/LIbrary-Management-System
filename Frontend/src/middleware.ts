import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const userCookie = request.cookies.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null
  const { pathname } = request.nextUrl
  const publicPaths = ['/login', '/register']
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (pathname.startsWith('/maintenance')) {
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
