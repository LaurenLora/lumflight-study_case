import { registerAs } from '@nestjs/config';

export default registerAs('firestore', () => ({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  keyFilename: process.env.FIRESTORE_KEY_FILENAME,
}));
