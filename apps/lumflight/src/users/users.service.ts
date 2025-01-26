import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/utils/hash';

@Injectable()
export class UsersService {
  private collectionName: string = 'users';
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await hashPassword(user.password);
    const docRef = await this.firestoreService
      .collection(this.collectionName)
      .add({
        ...user,

        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const snapshot = await this.firestoreService
      .collection(this.collectionName)
      .where('email', '==', email)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.firestoreService
      .collection(this.collectionName)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as User);
  }

  async findOne(id: string): Promise<User> {
    const doc = await this.firestoreService
      .collection(this.collectionName)
      .doc(id)
      .get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.firestoreService
      .collection(this.collectionName)
      .doc(userId)
      .update({ refreshToken });
  }

  async seed() {
    const flights = await this.firestoreService.collection('flights').get();

    console.log(
      flights.docs.map((doc) => ({ id: doc.id, ...doc.data() })).length,
    );
  }

  async seeds() {
    const flights = await this.firestoreService.seed();

    console.log(flights);
  }
}
