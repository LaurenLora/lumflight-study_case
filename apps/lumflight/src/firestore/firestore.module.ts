import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Firestore } from '@google-cloud/firestore';

@Module({
  imports: [ConfigModule],
  exports: [FirestoreService, 'FIRESTORE'],
  providers: [
    FirestoreService,
    {
      provide: 'FIRESTORE',
      useFactory: (configService: ConfigService) => {
        const privKey = configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n');
        return new Firestore({
          projectId: configService.get<string>('FIRESTORE_PROJECT_ID'),
          credentials: {
            private_key: privKey,
            client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class FirestoreModule {}
