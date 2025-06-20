import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from 'src/hotel/entities/hotel.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
  
  @Prop()
  otpCode?: string;

  @Prop()
  otpExpires?: Date;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: Hotel.name }], default: [] })
  wishlist:Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);
