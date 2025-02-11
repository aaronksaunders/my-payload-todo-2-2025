import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Let Payload handle /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // check for the session cookie
  const payloadToken = request.cookies.get('payload-token')
  if (!payloadToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to /home if the user tries to access the root URL
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Let the server components handle token verification
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/home', '/todo-create', '/todos/:path*', '/api/:path*'],
}
