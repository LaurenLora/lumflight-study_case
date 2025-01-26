export interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  airline: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  flightId: string;
  lastname: string;
  comment: string;
}

export interface TFlight {
  id: string;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  airline: string;
  price: number;
  customers: Customer[];
}
