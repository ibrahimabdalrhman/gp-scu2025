import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Hotel, HotelDocument } from 'src/hotel/entities/hotel.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,

  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewModel.create(createReviewDto);
    await this.calcAvgAndQuantity(createReviewDto.hotel); // ⬅️ هنا تستخدمها
    return review;
  }

  async calcAvgAndQuantity(hotelId): Promise<void> {
    const results = await this.reviewModel.aggregate([
      { $match: { hotel: hotelId } },
      {
        $group: {
          _id: '$hotel',
          avgRatings: { $avg: '$rating' },
          ratingQuantity: { $sum: 1 },
        },
      },
    ]);

    if (results.length > 0) {
      await this.hotelModel.findByIdAndUpdate(hotelId, {
        ratingsQuantity: results[0].ratingQuantity,
        ratingsAverage: Math.round(results[0].avgRatings),
      });
    } else {
      await this.hotelModel.findByIdAndUpdate(hotelId, {
        ratingsQuantity: 0,
        ratingsAverage: 0,
      });
    }
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().populate('user', 'name image');
  }

  async findByHotel(hotelId: string): Promise<Review[]> {
    return this.reviewModel.find({ hotel: hotelId }).populate('user', 'name image');
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Review not found');
    }
  }

  
}
