import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Airline, AirlineDocument } from 'src/airlines/entities/airline.entity';
import { AppModule } from 'src/app.module';
import { Flight, FlightDocument } from 'src/flight/entities/flight.entity';


enum FlightType {
  ONE_WAY = 'one_way',
  ROUND_TRIP = 'round_trip',
  MULTI_CITY = 'multi_city',
}

enum Amenity {
  WIFI = 'wifi',
  MEALS = 'meals',
  ENTERTAINMENT = 'entertainment',
  POWER_OUTLETS = 'power_outlets',
  EXTRA_LEGROOM = 'extra_legroom',
  BLANKETS = 'blankets',
  PILLOWS = 'pillows',
  HEADPHONES = 'headphones',
  USB_CHARGING = 'usb_charging',
  RECLINING_SEATS = 'reclining_seats',
  WINDOW_SEAT = 'window_seat',
  AISLE_SEAT = 'aisle_seat',
  PRIORITY_BOARDING = 'priority_boarding',
  LOUNGE_ACCESS = 'lounge_access',
}

function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomAmenities(): Amenity[] {
  const amenities = Object.values(Amenity);
  const count = Math.floor(Math.random() * 5) + 1;
  const selected = new Set<Amenity>();
  while (selected.size < count) {
    selected.add(getRandomFromArray(amenities));
  }
  return Array.from(selected);
}

function getRandomFlightTypes(): FlightType[] {
  const flightTypes = Object.values(FlightType);
  const count = Math.floor(Math.random() * flightTypes.length) + 1;
  const selected = new Set<FlightType>();
  while (selected.size < count) {
    selected.add(getRandomFromArray(flightTypes));
  }
  return Array.from(selected);
}

const airports = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Atlanta',
    'Dallas',
    'Denver',
    'San Francisco',
    'Seattle',
    'Miami',
    'Boston',
    'London',
    'Paris',
    'Tokyo',
    'Dubai',
    'Singapore',
    'Hong Kong',
    'Sydney',
    'Toronto',
    'Mexico City',
    'Rome',
    'Berlin',
    'Moscow',
    'Delhi',
    'Bangkok',
    'Istanbul',
    'Barcelona',
    'Amsterdam',
    'Johannesburg',
    'Buenos Aires',
    'Cairo',
    'Lagos',
    'Jakarta',
    'Kuala Lumpur',
    'Sao Paulo',
    'Zurich',
    'Vienna',
    'Lisbon',
    'Prague',
    'Budapest',
    'Copenhagen',
  ];
  
function getRandomAirport(exclude?: string): string {
  let airport;
  do {
    airport = getRandomFromArray(airports);
  } while (airport === exclude);
  return airport;
}

function getRandomGate(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters.charAt(Math.floor(Math.random() * letters.length));
  const number = Math.floor(Math.random() * 30) + 1; // من 1 إلى 30
  return `${letter}${number}`;
}

function getRandomTerminal(): string {
  return (Math.floor(Math.random() * 5) + 1).toString(); // من 1 إلى 5
}

function getRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDuration(): string {
  const hours = Math.floor(Math.random() * 6) + 1; // 1 - 6 ساعات
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
}

function getRandomStops(): number {
  return Math.floor(Math.random() * 4); // 0 - 3 محطات توقف
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const AirlineModel = app.get<Model<AirlineDocument>>(getModelToken(Airline.name));
  const FlightModel = app.get<Model<FlightDocument>>(getModelToken(Flight.name));

  const airlines = await AirlineModel.find().exec();

  if (airlines.length === 0) {
    console.error('❌ No airlines found in the database. Please seed airlines first.');
    await app.close();
    return;
  }

  await FlightModel.deleteMany({});

  const now = new Date();
  const flightsToInsert: Partial<FlightDocument>[] = [];

  for (const airline of airlines) {
    for (let i = 0; i < 3; i++) {
      const departureAirport = getRandomAirport();
      const arrivalAirport = getRandomAirport(departureAirport);
      const departureTime = new Date(now.getTime() + (24 + i * 4) * 60 * 60 * 1000);
      const flightDurationHours = Math.floor(Math.random() * 6) + 1;
      const flightDurationMs = flightDurationHours * 60 * 60 * 1000;
      const arrivalTime = new Date(departureTime.getTime() + flightDurationMs);

      const totalPassengers = Math.floor(Math.random() * 200) + 50;
      const availablePassengers = Math.floor(Math.random() * totalPassengers);

      const flight = {
        departure_airport: departureAirport,
        arrival_airport: arrivalAirport,
        departure_time: departureTime,
        arrival_time: arrivalTime,
        duration: getRandomDuration(),
        stops: getRandomStops(),
        flight_type: getRandomFlightTypes(),
        price_per_passenger: [
          { class_type: 'first_class', price: getRandomPrice(800, 1500) },
          { class_type: 'business_class', price: getRandomPrice(400, 800) },
          { class_type: 'economy_class', price: getRandomPrice(100, 400) },
        ],
        terminal: getRandomTerminal(),
        gate: getRandomGate(),
        amenities: getRandomAmenities(),
        total_passenger_number: totalPassengers,
        available_passenger_number: availablePassengers,
        description: `Flight from ${departureAirport} to ${arrivalAirport}`,
        airline: airline._id as Types.ObjectId,
    };

      flightsToInsert.push(flight);
    }
  }

  await FlightModel.insertMany(flightsToInsert);

  console.log(`✅ Seeded ${flightsToInsert.length} flights for ${airlines.length} airlines.`);

  await app.close();
}

bootstrap();
