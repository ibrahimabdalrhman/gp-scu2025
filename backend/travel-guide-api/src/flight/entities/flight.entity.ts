import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Airline } from 'src/airlines/entities/airline.entity';

export type FlightDocument = Flight & Document;

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
    LOUNGE_ACCESS = 'lounge_access'
  }

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true })
  departure_airport: string;

  @Prop({ required: true })
  arrival_airport: string;

  @Prop({ required: true, type: Date })
  departure_time: Date;

  @Prop({ required: true, type: Date })
  arrival_time: Date;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  stops: number;

  @Prop({ type: [String], enum: FlightType, required: true })
  flight_type: FlightType[];

  @Prop({
    type: [
      {
        class_type: { type: String, enum: ['first_class', 'business_class', 'economy_class'] },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  price_per_passenger: { class_type: string; price: number }[];

  @Prop({ required: true })
  terminal: string;

  @Prop({ required: true })
  gate: string;

  @Prop({ type: [String], enum: Amenity, required: true })
  amenities: Amenity[];

  @Prop({ required: true, type: Number })
  total_passenger_number: number;

  @Prop({ required: true, type: Number })
  available_passenger_number: number;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Airline.name, required: true })
  airline: Types.ObjectId;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
