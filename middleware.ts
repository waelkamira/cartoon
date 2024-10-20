import { NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://cartoonz.top', // Add your production origin
];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse('Invalid origin', { status: 403 });
  }

  const response = NextResponse.next({
    request: {
      ...request,
      headers: request.headers,
    },
  });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
