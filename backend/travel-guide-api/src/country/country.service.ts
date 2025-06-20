import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './entities/country.entity';
import { Model } from 'mongoose';

@Injectable()
export class CountryService {
   constructor(
    @InjectModel (Country.name) private  countryModel :Model<CountryDocument>,
   ){}
   
  create(createCountryDto: CreateCountryDto, images) {
    const imagePaths = images.map(image => image.path);
    const country = new this.countryModel({...createCountryDto, images: imagePaths});
    return country.save();
  }
  
  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findOne(id: string): Promise<Country> {
    return this.countryModel.findById(id).exec();
  }

  async update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country> {
    return this.countryModel.findByIdAndUpdate(id, updateCountryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Country> {
    return this.countryModel.findByIdAndDelete(id).exec();
  }
}
