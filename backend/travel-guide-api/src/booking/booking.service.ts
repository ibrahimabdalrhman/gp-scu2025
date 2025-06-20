import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from 'src/hotel/entities/hotel.entity';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './entities/booking.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';
import Stripe from 'stripe'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookingService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectModel(Booking.name) private bookingModel:Model<BookingDocument>,
    @InjectModel(Hotel.name) private hotelModel:Model<HotelDocument>,
    @InjectModel(User.name) private userModel:Model<UserDocument>
  ){
    const stripeKey = this.configService.get<string>('STRIPE_SECRET');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeKey);
  }

  async create(createBookingDto: CreateBookingDto, userId) {
    const hotel = await this.hotelModel.findById(createBookingDto.hotel).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${createBookingDto.hotel} not found`);
    }

    const user = await this.userModel.findById(userId.userId).exec();
  
    const checkIn = new Date(createBookingDto.checkIn);
    const checkOut = new Date(createBookingDto.checkOut);
  
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  
    const totalPrice = hotel.price * nights;
  
    // return  totalPrice
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: totalPrice * 100,
            product_data: {
              name: hotel.name,
              description: hotel.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://54.145.52.26:5000/success-payment/`,
      cancel_url: `http://54.145.52.26:5000/cancel-payment/`,
      customer_email: user.email,
      client_reference_id: hotel._id.toString(),
      metadata: {
        checkIn: createBookingDto.checkIn,
        checkOut: createBookingDto.checkOut,
        hotelId: createBookingDto.hotel,
        type: 'hotel'
      },
    });
  
    return { url : session.url};
  }
  

  async findAll(userId: string) {
    const booking = await this.bookingModel.find({
      user: new Types.ObjectId(userId),
    }).populate("hotel user").exec();
    return booking;
  }

  async findOne(id: string , user) {
    const booking = await this.bookingModel.findById(id).populate('hotel user').exec();
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    if ((booking.user as any)._id.toString() !== user.userId) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, user: { userId: string }) {
    
    const booking = await this.findOne(id, user);
    
      const hotel = await this.hotelModel.findById(booking.hotel).exec();
      if (hotel) {
        const checkIn = updateBookingDto.checkIn ? new Date(updateBookingDto.checkIn) : booking.checkIn;
        const checkOut = updateBookingDto.checkOut ? new Date(updateBookingDto.checkOut) : booking.checkOut;

        const nights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );
      }
  
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true })
      .populate('hotel')
      .exec();
  }

  async remove(id: string, user: { userId: string }) {
    const booking = await this.findOne(id, user);
    
    // Soft delete implementation
    return this.bookingModel.findByIdAndUpdate(id, 
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true }
    ).populate('hotel').exec();
    

  }
}
