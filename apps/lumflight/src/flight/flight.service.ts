import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { Customer, Flight, TFlight } from 'src/types/types';

@Injectable()
export class FlightService {
  private collectionName = 'flights';
  constructor(private readonly firestoreService: FirestoreService) {}

  async findAllFlights(
    page?: number,
    limit?: number,
  ): Promise<{ flights: Flight[]; total: number }> {
    const offset = (page - 1) * limit;

    const snapshot = await this.firestoreService
      .collection(this.collectionName)
      .offset(offset)
      .limit(limit)
      .get();

    const total = (
      await this.firestoreService.collection(this.collectionName).get()
    ).size;

    return {
      flights: snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Flight,
      ),
      total,
    };
  }

  // async create(flight: Flight): Promise<Flight> {
  //   const docRef = await this.firestoreService
  //     .collection(this.collectionName)
  //     .add({
  //       ...flight,

  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //   const doc = await docRef.get();
  //   return { id: doc.id, ...doc.data() } as Flight;
  // }

  async findOneFlights(id: string): Promise<Flight> {
    const doc = await this.firestoreService
      .collection(this.collectionName)
      .doc(id)
      .get();

    return { id: doc.id, ...(doc.data() as Flight) };
  }

  async findAllFlightsWithCustomers(
    page?: number,
    limit?: number,
  ): Promise<{ flights: TFlight[]; total: number }> {
    const offset = (page - 1) * limit;

    const flightsSnapshot = await this.firestoreService
      .collection('flights')
      .offset(offset)
      .limit(limit)
      .get();

    const flights = flightsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      customers: [],
    })) as TFlight[];

    const total = (await this.firestoreService.collection('flights').get())
      .size;

    const flightIds = flights.map((flight) => flight.id);

    if (flightIds.length === 0) {
      return { flights, total };
    }

    const customersSnapshot = await this.firestoreService
      .collection('customer')
      .where('flightId', 'in', flightIds)
      .get();

    const customersByFlightId = customersSnapshot.docs.reduce(
      (acc, doc) => {
        const customer = { id: doc.id, ...doc.data() } as Customer;
        const flightId = customer.flightId;

        if (!acc[flightId]) {
          acc[flightId] = [];
        }
        acc[flightId].push(customer);

        return acc;
      },
      {} as Record<string, Customer[]>,
    );

    const flightsWithCustomers: TFlight[] = flights.map((flight) => ({
      ...flight,
      customers: customersByFlightId[flight.id] || [],
    }));

    return { flights: flightsWithCustomers, total };
  }
}
