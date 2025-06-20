import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CountryModule } from 'src/country/country.module';
import { City, CitySchema } from './entities/city.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    CountryModule,
  ],
  
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
