// hotel.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
  
  @Prop({default:[]})
  images:string[];

}

export const CountrySchema = SchemaFactory.createForClass(Country);
