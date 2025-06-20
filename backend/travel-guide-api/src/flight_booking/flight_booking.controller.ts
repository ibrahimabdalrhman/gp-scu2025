import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FlightBookingService } from './flight_booking.service';
import { CreateFlightBookingDto } from './dto/create-flight_booking.dto';
import { UpdateFlightBookingDto } from './dto/update-flight_booking.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('flight-booking')
export class FlightBookingController {
  constructor(private readonly flightBookingService: FlightBookingService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFlightBookingDto: CreateFlightBookingDto, @Request() req) {
    return this.flightBookingService.create(createFlightBookingDto, req.user);
  }

  @Get()
  findAll() {
    return this.flightBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightBookingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightBookingDto: UpdateFlightBookingDto) {
    return this.flightBookingService.update(id, updateFlightBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightBookingService.remove(id);
  }
}
