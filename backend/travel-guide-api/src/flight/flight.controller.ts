import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('flightType') flightType?: [],
    @Query('classType') classType?: string[],
    // New query parameters
    @Query('airline') airline?: string | string[],
    @Query('minDuration') minDuration?: string,
    @Query('maxDuration') maxDuration?: string,
    @Query('stops') stops?: number | number[],
    @Query('minStops') minStops?: number,
    @Query('maxStops') maxStops?: number,
    @Query('departureTimeStart') departureTimeStart?: string,
    @Query('departureTimeEnd') departureTimeEnd?: string,
    @Query('arrivalTimeStart') arrivalTimeStart?: string,
    @Query('arrivalTimeEnd') arrivalTimeEnd?: string,
    @Query('departureDate') departureDate?: string,
    @Query('arrivalDate') arrivalDate?: string,
  ) {
    return this.flightService.findAll({ 
      from, 
      to, 
      page, 
      limit, 
      search,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      flightType: flightType ? Array.isArray(flightType) ? flightType : [] : undefined,
      classType: classType ? Array.isArray(classType) ? classType : [classType] : undefined,
      
      // New filter parameters with proper type handling
      airline: airline ? (Array.isArray(airline) ? airline : [airline]) : undefined,
      minDuration,
      maxDuration,
      stops: stops ? (Array.isArray(stops) ? stops.map(Number) : Number(stops)) : undefined,
      minStops: minStops ? Number(minStops) : undefined,
      maxStops: maxStops ? Number(maxStops) : undefined,
      departureTimeStart,
      departureTimeEnd,
      arrivalTimeStart,
      arrivalTimeEnd,
      departureDate,
      arrivalDate,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }
}
