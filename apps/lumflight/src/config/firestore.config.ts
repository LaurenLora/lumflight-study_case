import { registerAs } from '@nestjs/config';

export default registerAs('firestore', () => ({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  credentials: {
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  },
}));
