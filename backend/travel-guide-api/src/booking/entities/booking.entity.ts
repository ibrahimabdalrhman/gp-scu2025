// hotel.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
    // user - hotel - checkin - checkout - totalPrice - status - paymentAmount
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: string;
    @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
    hotel: string;
    @Prop({ required: true })
    checkIn: Date;
    @Prop({ required: true })
    checkOut: Date;
    @Prop({ required: true })
    totalPrice: number;
    @Prop({ required: true, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] })
    status: string;

    @Prop({default:0})
    paid: Boolean

}

export const BookingSchema = SchemaFactory.createForClass(Booking);
