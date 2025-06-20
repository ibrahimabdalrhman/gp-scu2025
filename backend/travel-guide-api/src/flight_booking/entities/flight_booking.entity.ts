import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Flight } from 'src/flight/entities/flight.entity';
import { User } from 'src/user/entities/user.entity';

export type FlightBookingDocument = FlightBooking & Document;

@Schema({ timestamps: true })
export class FlightBooking {
  @Prop({ type: Types.ObjectId, ref: Flight.name, required: true })
  flight: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  seat_class: string; // first_class, business_class, economy_class

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: Number })
  passenger_count: number;

  @Prop({ required: true })
  payment_status: string; // pending, paid, cancelled

  @Prop()
  special_requests: string;
}

export const FlightBookingSchema = SchemaFactory.createForClass(FlightBooking);
