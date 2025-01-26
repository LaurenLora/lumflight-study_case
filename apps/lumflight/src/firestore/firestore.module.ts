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
        return new Firestore({
          projectId: configService.get<string>('FIRESTORE_PROJECT_ID'),
          keyFilename: configService.get<string>('FIRESTORE_KEY_FILENAME'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class FirestoreModule {}
