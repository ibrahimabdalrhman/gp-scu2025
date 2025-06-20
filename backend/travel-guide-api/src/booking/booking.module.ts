import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './entities/booking.entity';
import { HotelModule } from 'src/hotel/hotel.module';
import { Hotel, HotelSchema } from 'src/hotel/entities/hotel.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Booking.name , schema :BookingSchema }]),
    MongooseModule.forFeature([{name:Hotel.name , schema :HotelSchema}]),
    MongooseModule.forFeature([{name:User.name , schema :UserSchema}]),
    HotelModule
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
