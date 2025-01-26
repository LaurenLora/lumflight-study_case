import { Injectable } from '@nestjs/common';
// import { generateCustomer } from 'src/common/scripts/generate-costumer';
import { FirestoreService } from 'src/firestore/firestore.service';
import { FlightService } from 'src/flight/flight.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  private collectionName: string = 'customer';
  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly flightService: FlightService,
  ) {}

  // async addCustomersToFlights(): Promise<void> {
  //   const { flights } = await this.flightService.findAllFlights();

  //   for (const flight of flights) {
  //     const numberOfCustomers = Math.floor(Math.random() * 3) + 1;

  //     for (let i = 0; i < numberOfCustomers; i++) {
  //       const customer = generateCustomer(flight.id);
  //       await this.firestoreService.collection(this.collectionName).add({
  //         name: customer.name,
  //         email: customer.email,
  //         flightId: customer.flightId,
  //         lastname: customer.lastname,
  //         comment: customer.comment,
  //       });
  //     }
  //   }
  // }

  async findAllCustomers() {
    const snapshot = await this.firestoreService
      .collection(this.collectionName)
      .get();

    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Customer,
    );
  }
}
