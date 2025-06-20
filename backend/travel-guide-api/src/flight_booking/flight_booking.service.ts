import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateFlightBookingDto } from './dto/create-flight_booking.dto';
import { UpdateFlightBookingDto } from './dto/update-flight_booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlightBooking } from './entities/flight_booking.entity';
import { Model } from 'mongoose';
import { Flight } from 'src/flight/entities/flight.entity';
import { User } from 'src/user/entities/user.entity';
import Stripe from 'stripe'; 
import { ConfigService } from '@nestjs/config';
/**
 * Service for handling flight bookings.
 */
@Injectable()
export class FlightBookingService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    @InjectModel(FlightBooking.name) private readonly flightBookingModel: Model<FlightBooking>,
    @InjectModel(Flight.name) private readonly flightModel: Model<Flight>,
    @InjectModel(User.name)  private readonly userModel: Model<User>,
  ) { 
    const stripeKey = this.configService.get<string>('STRIPE_SECRET');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeKey);
  }

  /**
   * Create a new flight booking.
   * @param createFlightBookingDto - The data for creating the flight booking.
   * @param user - The user making the booking.
   * @returns The created flight booking.
   * @throws NotFoundException if flight is not found
   * @throws BadRequestException if not enough available seats
   */
  async create(createFlightBookingDto, user: any) {
    // Validate flight exists
    const flight = await this.flightModel.findById(createFlightBookingDto.flight);
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    // Check seat availability
    if (createFlightBookingDto.passenger_count > flight.available_passenger_number) {
      throw new BadRequestException('Not enough available seats');
    }

    // Validate user exists
    const userExists = await this.userModel.findById(user.userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Create booking
    const flightBooking = new this.flightBookingModel({
      ...createFlightBookingDto,
      user: user.userId,
      booking_date: new Date(),
      payment_status: 'pending', // initial status
      price: createFlightBookingDto.price * createFlightBookingDto.passenger_count,
    });

    // Update available seats
    flight.available_passenger_number -= createFlightBookingDto.passenger_count;
    await flight.save();
    await flightBooking.save();
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: flightBooking.price * 100,
            product_data: {
              name: flight.departure_airport + " to " + flight.arrival_airport,
              description: flight.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://54.145.52.26:5000/success-payment/`,
      cancel_url: `http://54.145.52.26:5000/cancel-payment/`,
      customer_email: user.email,
      client_reference_id: flight._id.toString(),
      metadata: {
        flightId: flight._id.toString(),
        passengerCount: flightBooking.passenger_count,
        flightBookingId: flightBooking._id.toString(),
        passenger_count: flightBooking.passenger_count,
        type: 'flight'

      },
    });

    return { url : session.url};

  }

  /**
   * Get all flight bookings with optional user filter.
   * @param userId - Optional user ID to filter bookings
   * @returns All flight bookings or user's bookings
   */
  async findAll(userId?: string) {
    const query = userId ? { user: userId } : {};
    return await this.flightBookingModel.find(query)
      .populate('flight')
      .populate('user', 'firstname lastname phone_number name email')
      .exec();
  }

  /**
   * Find a specific flight booking by ID.
   * @param id - The ID of the flight booking to find.
   * @returns The found flight booking.
   * @throws NotFoundException if booking not found
   */
  async findOne(id: string) {
    const booking = await this.flightBookingModel.findById(id)
      .populate('flight')
      .populate('user', 'name email')
      .exec();

    if (!booking) {
      throw new NotFoundException(`Flight booking with ID ${id} not found`);
    }
    return booking;
  }

  /**
   * Update a specific flight booking.
   * @param id - The ID of the flight booking to update.
   * @param updateFlightBookingDto - The data to update the flight booking.
   * @returns The updated flight booking.
   * @throws NotFoundException if booking not found
   */
  async update(id: string, updateFlightBookingDto: UpdateFlightBookingDto) {
    const existingBooking = await this.flightBookingModel.findByIdAndUpdate(
      id,
      { $set: updateFlightBookingDto },
      { new: true }
    ).exec();

    if (!existingBooking) {
      throw new NotFoundException(`Flight booking with ID ${id} not found`);
    }

    return existingBooking;
  }

  /**
   * Remove a specific flight booking and release seats.
   * @param id - The ID of the flight booking to remove.
   * @returns The removed flight booking.
   * @throws NotFoundException if booking not found
   */
  async remove(id: string) {
    // Find booking first to get flight details
    const booking = await this.flightBookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException(`Flight booking with ID ${id} not found`);
    }

    // Release seats back to flight
    const flight = await this.flightModel.findById(booking.flight);
    if (flight) {
      flight.available_passenger_number += booking.passenger_count;
      await flight.save();
    }

    // Delete booking
    return await this.flightBookingModel.findByIdAndDelete(id).exec();
  }

  /**
   * Cancel a flight booking
   * @param id - The ID of the flight booking to cancel
   * @returns The cancelled flight booking
   */
  async cancelBooking(id: string) {
    const booking = await this.flightBookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException(`Flight booking with ID ${id} not found`);
    }

    // Only allow cancellation for confirmed bookings
    if (booking.payment_status !== 'confirmed') {
      throw new BadRequestException('Only confirmed bookings can be cancelled');
    }

    // Release seats back to flight
    const flight = await this.flightModel.findById(booking.flight);
    if (flight) {
      flight.available_passenger_number += booking.passenger_count;
      await flight.save();
    }

    // Update booking status
    booking.payment_status = 'cancelled';
    return await booking.save();
  }

  /**
   * Get bookings by flight ID
   * @param flightId - The ID of the flight
   * @returns Array of bookings for the flight
   */
  async getBookingsByFlight(flightId: string) {
    return await this.flightBookingModel.find({ flight: flightId })
      .populate('user', 'name email')
      .exec();
  }
}