

import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    hotel: string;
  
    @IsDateString()
    checkIn: string;
  
    @IsDateString()
    checkOut: string;

    @IsBoolean()
    @IsOptional()
    paid: boolean;

    @IsString()
    @IsOptional()
    status: string;
  }
  

