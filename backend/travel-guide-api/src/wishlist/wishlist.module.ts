import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}])
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
