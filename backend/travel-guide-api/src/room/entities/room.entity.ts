// room.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { FeatureEnum } from '../dto/FeatureEnum';
import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
  
  @Prop({type:Types.ObjectId, ref:City.name, required:true})
  city: Types.ObjectId;
  
  @Prop({type:Types.ObjectId, ref:Country.name, required:true})
  country: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({enum: ['single', 'double', 'suite'], required: true, default: "single"})
  type: string;

  @Prop({default: 0})
  starts : number;

  @Prop()
  checkin: Date;
  @Prop()
  checkout: Date;

  @Prop({ default: false })
  booked: boolean;
  
  @Prop()
  rating: number;

  @Prop({ default: 0 })
  reviews: number;

  @Prop({ type: [String], default: [] })
  comments : string[];

  @Prop({ type: [String], default: [] })
  featured: FeatureEnum[];

  @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
  hotel: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
