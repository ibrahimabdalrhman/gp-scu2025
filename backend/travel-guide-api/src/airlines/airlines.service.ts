import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Airline, AirlineDocument } from './entities/airline.entity';
import { Model } from 'mongoose';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectModel(Airline.name) private readonly airlineModel: Model<AirlineDocument>,
  ) {}

  async create(createAirlineDto: CreateAirlineDto): Promise<Airline> {
    const airline = new this.airlineModel(createAirlineDto);
    return await airline.save();
  }

  async findAll(): Promise<Airline[]> {
    return await this.airlineModel.find().exec();
  }

  async findOne(id: string): Promise<Airline> {
    const airline = await this.airlineModel.findById(id).exec();
    if (!airline) {
      throw new NotFoundException(`Airline with ID ${id} not found`);
    }
    return airline;
  }

  async update(id: string, updateAirlineDto: UpdateAirlineDto): Promise<Airline> {
    const updatedAirline = await this.airlineModel.findByIdAndUpdate(id, updateAirlineDto, { new: true }).exec();
    if (!updatedAirline) {
      throw new NotFoundException(`Airline with ID ${id} not found`);
    }
    return updatedAirline;
  }

  async remove(id: string): Promise<void> {
    const result = await this.airlineModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Airline with ID ${id} not found`);
    }
  }
}
