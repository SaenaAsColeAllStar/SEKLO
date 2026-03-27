import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/guru') || pathname.startsWith('/siswa') || pathname.startsWith('/orang-tua')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = token.role as string;

    // RBAC Logic
    if (pathname.startsWith('/admin') && !(role === 'SUPER_ADMIN' || role === 'ADMIN_TU')) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/guru') && role !== 'GURU') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/siswa') && role !== 'SISWA') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/orang-tua') && role !== 'ORANG_TUA') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === '/login' && token) {
    const role = token.role as string;
    if (role === 'SUPER_ADMIN' || role === 'ADMIN_TU') return NextResponse.redirect(new URL('/admin', req.url));
    if (role === 'GURU') return NextResponse.redirect(new URL('/guru', req.url));
    if (role === 'SISWA') return NextResponse.redirect(new URL('/siswa', req.url));
    if (role === 'ORANG_TUA') return NextResponse.redirect(new URL('/orang-tua', req.url));
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/guru/:path*', '/siswa/:path*', '/orang-tua/:path*', '/login'],
};
