import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReviewModule } from './review/review.module';
import { WebhookModule } from './webhook/webhook.module';
import { AirlinesModule } from './airlines/airlines.module';
import { FlightModule } from './flight/flight.module';
import { FlightBookingModule } from './flight_booking/flight_booking.module';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads', 
    }),
    UserModule,

    HotelModule,

    RoomModule,

    CityModule,

    CountryModule,

    AuthModule,

    BookingModule,

    WishlistModule,

    ReviewModule,

    WebhookModule,

    AirlinesModule,

    FlightModule,

    FlightBookingModule,

    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
