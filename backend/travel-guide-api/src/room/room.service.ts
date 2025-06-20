import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './entities/room.entity';


interface FilterOptions {
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  country?: string;
  hotel?: string;
  search?: string;
}


@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto,images): Promise<Room> {
    const imagePaths = images.map(image => image.path);
    const createdRoom = new this.roomModel({...createRoomDto, images: imagePaths});
    return createdRoom.save();
  }

  async findAll(filterOptions: FilterOptions): Promise<{ data: Room[], total: number, page: number, limit: number }> {
    const { page, limit, minPrice, maxPrice, city, country, hotel,  search } = filterOptions;
    
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
      query.city = city;
    }
    
    // Country filter
    if (country) {
      query.country = country;
    }

    // Hotel filter
    if (hotel) {
      query.hotel = hotel;
    }
    
    // Search in title and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const [data, total] = await Promise.all([
      this.roomModel.find(query)
        .populate('hotel city country')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.roomModel.countDocuments(query).exec()
    ]);
    
    return {
      data,
      total,
      page,
      limit
    };
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Room> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
