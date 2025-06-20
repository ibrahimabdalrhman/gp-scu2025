import { Module } from '@nestjs/common';
import { FlightBookingService } from './flight_booking.service';
import { FlightBookingController } from './flight_booking.controller';
import { FlightBooking, FlightBookingSchema } from './entities/flight_booking.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from 'src/flight/entities/flight.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: FlightBooking.name, schema: FlightBookingSchema }]),
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]), // Assuming you have a Flight entity
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Assuming you have a Flight entity
  ],
  controllers: [FlightBookingController],
  providers: [FlightBookingService],
})
export class FlightBookingModule {}
