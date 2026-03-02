import { NextResponse } from 'next/server';

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_LONG_SECONDS,
  SESSION_MAX_AGE_SHORT_SECONDS,
} from '@/lib/auth/session';
import { getFirebaseAdminServices } from '@/lib/firebase/admin';

interface SessionRequestBody {
  idToken?: string;
  rememberMe?: boolean;
}

export async function POST(request: Request) {
  try {
    const { adminAuth } = getFirebaseAdminServices();
    const body = (await request.json()) as SessionRequestBody;

    if (!body.idToken) {
      return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
    }

    const maxAgeSeconds = body.rememberMe
      ? SESSION_MAX_AGE_LONG_SECONDS
      : SESSION_MAX_AGE_SHORT_SECONDS;

    const sessionCookie = await adminAuth.createSessionCookie(body.idToken, {
      expiresIn: maxAgeSeconds * 1000,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to create session';
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
  });

  return response;
}
