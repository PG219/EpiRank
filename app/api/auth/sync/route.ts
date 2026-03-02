import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

import { getFirebaseAdminServices } from '@/lib/firebase/admin';

interface SyncRequestBody {
  name?: string;
  institution?: string;
}

export async function POST(request: Request) {
  try {
    const { adminAuth, adminDb } = getFirebaseAdminServices();
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authorization bearer token' },
        { status: 401 }
      );
    }

    const idToken = authHeader.replace('Bearer ', '').trim();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const body = (await request.json()) as SyncRequestBody;

    const userRef = adminDb.collection('users').doc(decodedToken.uid);
    const userSnapshot = await userRef.get();

    const payload: Record<string, unknown> = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? null,
      name: body.name ?? decodedToken.name ?? '',
      institution: body.institution ?? '',
      photoURL: decodedToken.picture ?? null,
      provider: decodedToken.firebase.sign_in_provider,
      emailVerified: decodedToken.email_verified ?? false,
      lastLoginAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (!userSnapshot.exists) {
      payload.createdAt = FieldValue.serverTimestamp();
    }

    await userRef.set(payload, { merge: true });

    return NextResponse.json({ success: true, synced: true, uid: decodedToken.uid });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to sync user profile';

    const isFirestoreApiDisabled =
      message.includes('Cloud Firestore API has not been used') ||
      message.includes('PERMISSION_DENIED');

    if (isFirestoreApiDisabled) {
      return NextResponse.json({
        success: true,
        synced: false,
        warning:
          'Firestore API is disabled for this project. Login succeeded, but profile sync was skipped.',
      });
    }

    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}
