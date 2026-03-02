import 'server-only';

import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

type FirebaseAdminServices = {
  adminAuth: ReturnType<typeof getAuth>;
  adminDb: ReturnType<typeof getFirestore>;
};

let cachedServices: FirebaseAdminServices | null = null;

export const getFirebaseAdminServices = (): FirebaseAdminServices => {
  if (cachedServices) {
    return cachedServices;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId) {
    throw new Error(
      'Missing FIREBASE_PROJECT_ID (or NEXT_PUBLIC_FIREBASE_PROJECT_ID as fallback).'
    );
  }

  const app = getApps().length
    ? getApp()
    : clientEmail && privateKey
      ? initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
          }),
        })
      : initializeApp({ projectId });

  if (!clientEmail || !privateKey) {
    const hasAdc = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    if (!hasAdc) {
      throw new Error(
        'Firebase Admin is not configured. Set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY, or configure GOOGLE_APPLICATION_CREDENTIALS.'
      );
    }
  }

  cachedServices = {
    adminAuth: getAuth(app),
    adminDb: getFirestore(app),
  };

  return cachedServices;
};
