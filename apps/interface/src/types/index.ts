export type THomeCard = {
  key: string;
  title: string;
  description: string;
  label: string;
  image: string;
  link: string;
  isExternal: boolean;
};

export type TCredentials = {
  email: string;
  password: string;
};

export enum Role {
  Staff = "staff",
  Admin = "admin"
}

export interface TCustomer {
  email: string;
  flightId: string;
  name: string;
  lastname: string;
  comment: string;
}

export interface TFlight {
  id: string;
  flightNumber: string;
  departure: string;
  departureAirportCode: string;
  destination: string;
  destinationAirportCode: string;
  departureTime: Timestamp | Date;
  arrivalTime: Timestamp | Date;
  duration: number;
  airline: string;
  price: number;
  customers?: TCustomer[];
}
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface FlightApiResponse {
  flights: TFlight[];
  total: number;
}
