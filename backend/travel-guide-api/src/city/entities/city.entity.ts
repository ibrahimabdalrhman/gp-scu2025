// hotel.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Country } from 'src/country/entities/country.entity';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
  
  @Prop({default:[]})
  images:string[];

  @Prop({ type: Types.ObjectId, ref: Country.name, required: true })
  country: Types.ObjectId;
}



export const CitySchema = SchemaFactory.createForClass(City);
