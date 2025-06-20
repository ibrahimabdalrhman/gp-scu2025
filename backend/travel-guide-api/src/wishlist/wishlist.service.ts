import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
  @InjectModel(User.name) private userModel:Model<UserDocument>){}


  async update(hotelId: string, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
  
    const hotelObjectId = new Types.ObjectId(hotelId);
  
    const index = user.wishlist.findIndex(
      (id) => id.toString() === hotelId
    );
  
    if (index === -1) {
      // Not in wishlist → add
      user.wishlist.push(hotelObjectId);
    } else {
      // Already in wishlist → remove
      user.wishlist.splice(index, 1);
    }
  
    await user.save();
  
    return this.userModel.findById(userId).populate('wishlist').exec();
  }
    

  async findAll(uyserId) {
    const user = await this.userModel.findById(uyserId).populate('wishlist').exec();
    return user.wishlist;
  }

  
}
