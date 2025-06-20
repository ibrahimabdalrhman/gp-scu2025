import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from  './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookingDto:CreateBookingDto , @Request() req ) {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Request() req) {
    return this.bookingService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string , @Request() req) {
    return this.bookingService.findOne(id , req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Request() req) {
    return this.bookingService.update(id, updateBookingDto , req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string , @Request() req) {
    return this.bookingService.remove(id , req.user);
  }
}
