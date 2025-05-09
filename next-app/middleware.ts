import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Paths that don't require authentication
const publicPaths = ['/login', '/api/auth/login']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Allow access to public paths without authentication
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next()
  }
  
  // Check for auth token in cookies
  const token = request.cookies.get('auth_token')?.value
  
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '7135')
    await jwtVerify(token, secret)
    console.log('Token verified')
    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    console.log('Token is invalid')
    console.error('Token verification error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Configure which paths the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth/login (API routes that handle authentication)
     * 2. /login (login page)
     * 3. /_next (Next.js internals)
     * 4. /static (static files)
     * 5. /favicon.ico, /robots.txt (common browser requests)
     */
    '/((?!api/auth/login|login|_next|static|favicon.ico|robots.txt).*)',
  ],
}
