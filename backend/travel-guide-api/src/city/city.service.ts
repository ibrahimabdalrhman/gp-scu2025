import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './entities/city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
   constructor(
    @InjectModel (City.name) private  cityModel :Model<CityDocument>,
   ){}



  create(createCityDto: CreateCityDto, images) {
    const imagePaths = images.map(image => image.path);
    const city = new this.cityModel({...createCityDto, images: imagePaths});
    return city.save();
  }
  
  async findAll(): Promise<City[]> {
    return this.cityModel.find().populate('country').exec();
  }

  async findOne(id: string): Promise<City> {
    return this.cityModel.findById(id).exec();
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityModel.findByIdAndUpdate(id, updateCityDto, { new: true }).exec();
  }

  async remove(id: string): Promise<City> {
    return this.cityModel.findByIdAndDelete(id).exec();
  }
}
