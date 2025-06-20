import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Query, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Hotel, HotelSchema } from 'src/hotel/entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
  hotel: Types.ObjectId;

  @Prop()
  comment: string;

  @Prop({
    type: Number,
    min: [1, 'Min rating value is 1.0'],
    max: [5, 'Max rating value is 5.0'],
    required: [true, 'Rating is required'],
  })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);



ReviewSchema.pre(/^find/, function (this: Query<any, any>, next) {
    this.populate({ path: 'user', select: 'firstname lastname  avatar' });
    next();
  });