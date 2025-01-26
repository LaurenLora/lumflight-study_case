import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirestoreService } from 'src/firestore/firestore.service';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  imports: [FirestoreModule],
  providers: [UsersService, FirestoreService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
