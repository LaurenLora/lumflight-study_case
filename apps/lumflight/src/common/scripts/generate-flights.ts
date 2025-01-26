interface Flight {
  flightNumber: string;
  departure: string;
  departureAirportCode: string;
  destination: string;
  destinationAirportCode: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  airline: string;
  price: number;
}

const airportCodes: { [key: string]: string } = {
  Istanbul: 'IST',
  Ankara: 'ESB',
  Izmir: 'ADB',
  Antalya: 'AYT',
  London: 'LHR',
  Paris: 'CDG',
  Berlin: 'BER',
  'New York': 'JFK',
};

export const generateFlight = (): Flight => {
  const airlines = ['Turkish Airlines', 'Pegasus', 'AtlasGlobal', 'AnadoluJet'];
  const cities = [
    'Istanbul',
    'Ankara',
    'Izmir',
    'Antalya',
    'London',
    'Paris',
    'Berlin',
    'New York',
  ];

  const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
  const randomDeparture = cities[Math.floor(Math.random() * cities.length)];
  const randomDestination = cities.filter((city) => city !== randomDeparture)[
    Math.floor(Math.random() * (cities.length - 1))
  ];

  const departureTime = new Date();
  departureTime.setDate(
    departureTime.getDate() + Math.floor(Math.random() * 30),
  ); // Rastgele tarih (30 gün içinde)
  const arrivalTime = new Date(departureTime);
  const flightDuration = Math.floor(Math.random() * 12 * 60) + 60; // Uçuş süresi 1-12 saat arası (dakika cinsinden)
  arrivalTime.setMinutes(departureTime.getMinutes() + flightDuration);

  return {
    flightNumber: `FL${Math.floor(Math.random() * 10000)}`, // Rastgele uçuş numarası
    departure: randomDeparture,
    departureAirportCode: airportCodes[randomDeparture],
    destination: randomDestination,
    destinationAirportCode: airportCodes[randomDestination],
    departureTime,
    arrivalTime,
    duration: flightDuration, // Uçuş süresi (dakika cinsinden)
    airline: randomAirline,
    price: Math.floor(Math.random() * 500) + 100, // Fiyat 100-600 arası
  };
};
