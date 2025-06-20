import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';
import { FeatureEnum } from '../dto/FeatureEnum';
import { StayType } from '../dto/StayType';
import { Review } from 'src/review/entities/review.entity';

export type HotelDocument = Hotel & Document;

const images = [
  'https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg',
  'https://images.pexels.com/photos/2873951/pexels-photo-2873951.jpeg',
  'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg',
  'https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg',
  'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
  'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
  'https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg',
  'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
  'https://images.pexels.com/photos/2351289/pexels-photo-2351289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2255424/pexels-photo-2255424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/279805/pexels-photo-279805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3770291/pexels-photo-3770291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2351290/pexels-photo-2351290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const HOTEL_IMAGES = images;

function getRandomImage(): string {
  const index = Math.floor(Math.random() * HOTEL_IMAGES.length);
  return HOTEL_IMAGES[index];
}

function getRandomImages(): string[] {
  const shuffled = [...HOTEL_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 7);
}



@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: City.name, required: true })
  city: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Country.name, required: true })
  country: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  featured: FeatureEnum[];

  @Prop({ enum: ['single', 'double', 'sweet', 'suite', 'family'], default: 'single' })
  type: string;

  @Prop({ type: [String], default: [] })
  stayType: StayType[];

  @Prop({ default: getRandomImages })
  images: string[];

  @Prop({ default: getRandomImage })
  coverImage: string;

  @Prop({ required: true })
  totalRooms: number;

  @Prop({ default: 0 })
  availableRooms: number;

  @Prop({ default: 0 })
  reservedRooms: number;

  @Prop({ default: true })
  availableStatus: boolean;

  @Prop({ required: true })
  price: number;

  @Prop()
  priceAfterDiscount: number;

  @Prop({ default: 0, min: 1, max: 5 })
  ratingsAverage: number;

  @Prop({ default: 0 })
  ratingsQuantity: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

// ✅ virtual relation for "reviews"
HotelSchema.virtual('reviews', {
  ref: 'Review',           // اسم النموذج المرتبط (يجب أن يكون نفس الاسم المسجل في ReviewModule)
  foreignField: 'hotel',   // الحقل الموجود في مراجعة Review يشير إلى الفندق
  localField: '_id',       // الحقل المحلي (معرف الفندق)
});
