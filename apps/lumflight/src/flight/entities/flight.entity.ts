export class Flight {
  id: string;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  airline: string;
  price: number;

  constructor(partial: Partial<Flight>) {
    Object.assign(this, partial);
  }
}
