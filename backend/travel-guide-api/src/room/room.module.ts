import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { HotelModule } from 'src/hotel/hotel.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './entities/room.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    HotelModule, 
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
