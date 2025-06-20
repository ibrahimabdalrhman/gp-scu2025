import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entities/hotel.entity';
import { City, CitySchema } from 'src/city/entities/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema   }]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports:[HotelService]
})
export class HotelModule {}
