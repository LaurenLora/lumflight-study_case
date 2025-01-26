import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FlightModule } from './flight/flight.module';
import { CustomerModule } from './costumer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    FirestoreModule,
    AuthModule,
    CustomerModule,
    FlightModule,
  ],
})
export class AppModule {}
