import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from 'src/app.module';
import { City } from 'src/city/entities/city.entity';
import { FeatureEnum } from 'src/hotel/dto/FeatureEnum';
import { StayType } from 'src/hotel/dto/StayType';
import { Hotel } from 'src/hotel/entities/hotel.entity';

export const HOTEL_NAMES = [
  'Sunset Paradise Hotel',
  'Grand Royal Resort',
  'Ocean View Inn',
  'Mountain Peak Lodge',
  'Cityscape Suites',
  'Desert Rose Hotel',
  'Blue Lagoon Resort',
  'Skyline Hotel',
  'Palm Breeze Villa',
  'Golden Horizon Hotel',
  'Royal Palm Inn',
  'Silver Lake Lodge',
  'Emerald Bay Hotel',
  'Whispering Pines Resort',
  'Crimson Dunes Hotel',
  'Starlight Haven',
  'Azure Waters Resort',
  'The Sapphire Retreat',
  'Maple Leaf Lodge',
  'Evergreen Escape Hotel',
  'Serenity Sands Inn',
  'Amber Glow Resort',
  'Cloud Nine Hotel',
  'White Orchid Villa',
  'Majestic Palace Hotel',
  'Horizon Line Resort',
  'Tranquil Shores Lodge',
  'Coral Reef Hotel',
  'The Grand Oasis',
  'Harmony Hill Inn',
  'Aurora Sky Hotel',
  'Lakeside Serenity Resort',
  'The Velvet Sunset',
  'Golden Palms Hotel',
  'Sea Breeze Residence',
  'Twilight Ridge Hotel',
  'Coastal Charm Inn',
  'Urban Nest Hotel',
  'The Royal Haven',
  'Rosewood Garden Hotel',
  'Moonlight Mirage Hotel',
  'Crystal Waters Resort',
  'Hidden Gem Hotel',
  'Cedar Valley Inn',
  'Sunrise Peak Hotel',
  'Lavender Fields Resort',
  'Windmill Breeze Lodge',
  'The Gilded Nest',
  'Blue Horizon Palace',
  'The Timeless Retreat',
];


function getRandomEnum<T>(e: T): T[keyof T] {
  const values = Object.values(e);
  return values[Math.floor(Math.random() * values.length)];
}

function getRandomEnumArray<T>(e: T, count = 3): T[keyof T][] {
  const shuffled = Object.values(e).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const cityModel = app.get<Model<City>>(getModelToken(City.name));
  const hotelModel = app.get<Model<Hotel>>(getModelToken(Hotel.name));

  const cities = await cityModel.find().populate('country');

  if (!cities.length) {
    console.log('❌ No cities found. Run city.seed.ts first.');
    process.exit(1);
  }

  for (const city of cities) {
    const numHotels = getRandomNumber(1, 3); // Create 1-3 hotels per city
    for (let i = 0; i < numHotels; i++) {
      const totalRooms = getRandomNumber(20, 100);
      const reservedRooms = getRandomNumber(0, totalRooms);
      const availableRooms = totalRooms - reservedRooms;
      const priceValue=  getRandomNumber(50, 300)

      await hotelModel.create({
        name: HOTEL_NAMES[Math.floor(Math.random() * HOTEL_NAMES.length)] + ` - ${city.name}`,
        description: `A beautiful hotel in ${city.name}, ${(city.country as any).name}`,
        city: city._id,
        country: city.country._id,
        type: getRandomEnum({ single: 'single', double: 'double', sweet: 'sweet', suite: 'suite', family: 'family' }),
        stayType: getRandomEnumArray(StayType),
        featured: getRandomEnumArray(FeatureEnum),
        totalRooms,
        reservedRooms,
        availableRooms,
        price: priceValue - 30 ,
        priceAfterDiscount: priceValue,
        ratingsAverage: getRandomNumber(1, 5),
        ratingsQuantity: getRandomNumber(0, 500),

      });

      console.log(`✅ Hotel added in ${city.name}`);
    }
  }

  await app.close();
  process.exit(0);
}

bootstrap();
