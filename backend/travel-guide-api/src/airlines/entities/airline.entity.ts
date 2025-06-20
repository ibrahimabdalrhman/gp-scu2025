// hotel.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type AirlineDocument = Airline & Document;

@Schema({ timestamps: true })
export class Airline {
 
    @Prop({ required: true })
    name: string;
    @Prop()
    image: string;

}

export const AirlineSchema = SchemaFactory.createForClass(Airline);
