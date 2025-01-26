import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { FlightService } from 'src/flight/flight.service';
import { CustomerController } from './costumer.controller';

@Module({
  imports: [FirestoreModule],
  providers: [CustomerService, FlightService],
  controllers: [CustomerController],
})
export class CustomerModule {}
