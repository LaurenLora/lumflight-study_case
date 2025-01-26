export class Customer {
  id: string;
  name: string;
  email: string;
  flightId: string;
  lastname: string;
  comment: string;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
