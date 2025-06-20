import { Module } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { AirlinesController } from './airlines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Airline, AirlineSchema } from './entities/airline.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Airline.name , schema :AirlineSchema }]),
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService],
})
export class AirlinesModule {}
