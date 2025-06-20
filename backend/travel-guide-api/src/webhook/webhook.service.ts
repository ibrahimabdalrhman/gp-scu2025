import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'src/booking/entities/booking.entity';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/hotel/entities/hotel.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { Flight, FlightDocument } from 'src/flight/entities/flight.entity';
import { FlightBooking, FlightBookingDocument } from 'src/flight_booking/entities/flight_booking.entity';
const stripe = require("stripe")('sk_test_51Me28BH1n7EX55b0No94ytQvxO3vuGqlg4pydvZoBvVNMh6rSqehYCRbpwmrCPEXZ72VfhFnW2o8D4RFd501bb7q00uv9H8Uiu')

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Booking.name) private bookingModel:Model<BookingDocument>,
    @InjectModel(FlightBooking.name) private flightbookingModel:Model<FlightBookingDocument>,
    @InjectModel(Flight.name) private flightModel:Model<FlightDocument>,
    @InjectModel(Hotel.name) private hotelgModel:Model<HotelDocument>,
    @InjectModel(User.name) private userModel:Model<UserDocument>,

  ) {}
  async create(body: Buffer, sig: string) {
    let event;
    console.log("====service file=====");
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        'whsec_ZbTMDNlfx2xNl7W1FEe8zO18B4WS4zEG'
      );
    } catch (err) {
      console.error("Failed to verify Stripe signature");
      throw new Error(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if(session.metadata.type ==='hotel'){
        const hotel = await this.hotelgModel.findById(session.client_reference_id);
        if (!hotel) {
          throw new Error("Hotel Not Found");
        }
    
        const user = await this.userModel.findOne({
          email: session.customer_email,
        });

        if (!user) {
          throw new Error("User Not Found");
        }

        // Check if the booking already exists
        const existingBooking = await this.bookingModel.findOne({
          user: user._id,
          hotel: hotel._id,
          checkIn: session.metadata.checkIn,
          checkOut: session.metadata.checkOut,
        });

        if (existingBooking) {
          console.log("Booking already exists!");
          return { received: true };
        }
        const booking = await this.bookingModel.create({
          user: user._id,
          hotel: hotel._id,
          checkIn: session.metadata.checkIn,
          checkOut: session.metadata.checkOut,
          totalPrice: session.amount_total / 100,
          status: 'confirmed',
          paid:true
        });
    
        console.log("Hotel Booking created!");
      }
      
      if(session.metadata.type ==='flight'){
        
        const flight = await this.flightModel.findById(session.client_reference_id);
        if (!flight) {
          throw new Error("flight Not Found");
        }
    
        const user = await this.userModel.findOne({
          email: session.customer_email,
        });

        if (!user) {
          throw new Error("User Not Found");
        }

        console.log("session.metadata.flightBookingId : " ,session.metadata.flightBookingId)
        console.log("session.metadata.type : " ,session.metadata.type)

        await this.flightbookingModel.findByIdAndUpdate(
          session.metadata.flightBookingId ,
          { payment_status: 'paid' },
          { new: true }
        );
    
        console.log("Booking created!");
      }

   
      
      
    }
    return { received: false };
  }
  

  findAll() {
    return `This action returns all webhook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhook`;
  }

  update(id: number, updateWebhookDto: UpdateWebhookDto) {
    return `This action updates a #${id} webhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhook`;
  }
}
