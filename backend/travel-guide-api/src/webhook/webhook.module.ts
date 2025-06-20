import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from 'src/hotel/hotel.module';
import { Booking, BookingSchema } from 'src/booking/entities/booking.entity';
import { Hotel, HotelSchema } from 'src/hotel/entities/hotel.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Flight, FlightSchema } from 'src/flight/entities/flight.entity';
import { FlightBooking, FlightBookingSchema } from 'src/flight_booking/entities/flight_booking.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Booking.name , schema :BookingSchema }]),
    MongooseModule.forFeature([{name:Hotel.name , schema :HotelSchema}]),
    MongooseModule.forFeature([{name:User.name , schema :UserSchema}]),
    MongooseModule.forFeature([{name:Flight.name , schema :FlightSchema}]),
    MongooseModule.forFeature([{name:FlightBooking.name , schema :FlightBookingSchema}]),
    HotelModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
