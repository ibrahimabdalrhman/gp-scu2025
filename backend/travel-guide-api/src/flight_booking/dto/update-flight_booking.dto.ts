import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightBookingDto } from './create-flight_booking.dto';

export class UpdateFlightBookingDto extends PartialType(CreateFlightBookingDto) {}
