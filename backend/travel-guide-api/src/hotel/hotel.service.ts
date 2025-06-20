import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel, HotelDocument } from './entities/hotel.entity';
import { StayType } from './dto/StayType';
import { FeatureEnum } from './dto/FeatureEnum';
import { RatingEnum } from './dto/RatingEnum';
import { City, CityDocument } from 'src/city/entities/city.entity';
import { log } from 'console';

interface FilterOptions {
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  country?: string;
  search?: string;
  featured?: FeatureEnum[];
  stayType?: StayType[];
  rating?: RatingEnum[];
}

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) { }

  async create(createHotelDto: CreateHotelDto, images): Promise<Hotel> {
    let imagePaths: string[] = undefined;
    if(images){
      imagePaths = images.map(image => image.path);
    }
    const createdHotel = new this.hotelModel({ ...createHotelDto, images: imagePaths });
    return createdHotel.save();
  }

  async findAll(filterOptions: FilterOptions): Promise<{ data: Hotel[], total: number, page: number, limit: number }> {
    const { page, limit, minPrice, maxPrice, city, country, search, featured, stayType, rating } = filterOptions;

    // Build filter query
    const query: any = {};
  
    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }
  
    // City filter
    if (city) {
      let cityId = (await this.cityModel.findOne({ name: city }).exec())._id;  
      query.city = cityId;
      log(`City ID for ${city}: ${cityId}`);  // Log the city ID for debugging
    }
  
    // Country filter
    if (country) {
      query.country = country;
    }
  
    // Search in name and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
  
    // Featured filter
    if (featured && featured.length > 0) {
      query.featured = { $in: featured };
    }
  
    // StayType filter
    if (stayType && stayType.length > 0) {
      query.stayType = { $in: stayType };
    }
  
    // Rating filter (array)
    if (rating && rating.length > 0) {
      query.ratingsAverage = { $in: rating };  // Match any rating in the array
    }
  
    // Pagination
    const skip = (page - 1) * limit;
  
    // Execute query
    const [data, total] = await Promise.all([
      this.hotelModel.find(query)
        .populate('city country')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.hotelModel.countDocuments(query).exec()
    ]);
  
    return {
      data,
      total,
      page,
      limit
    };
  }
  

  async findOne(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id)
    .populate('city country')
    .exec();
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Hotel> {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }


}
