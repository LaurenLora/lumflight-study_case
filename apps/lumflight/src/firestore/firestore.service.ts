import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { generateFlight } from 'src/common/scripts/generate-flights';

@Injectable()
export class FirestoreService {
  constructor(
    @Inject('FIRESTORE')
    private readonly firestore: Firestore,
  ) {}

  collection(collectionName: string) {
    return this.firestore.collection(collectionName);
  }

  async seed() {
    try {
      for (let i = 0; i < 100; i++) {
        const flight = generateFlight();
        await this.firestore.collection('flights').add(flight);

        console.log('added', flight);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
