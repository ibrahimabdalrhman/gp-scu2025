import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null>  {
    return this.userModel.findOne({email}).exec();
  }
  async findByEmailOrPhone(email: string, phoneNumber: string): Promise<User | null> {
    return this.userModel.findOne({
      $or: [
        { email: email },
        { phone_number: phoneNumber }
      ]
    }).exec();
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async profile(id:string){
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async changePassword(id:string , oldPasssword: string, newPassword:string){

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    
    const isMatch = await bcrypt.compare(oldPasssword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    return user.save();

  }

  async sendPasswordResetOtp(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiration = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes
  
    user.otpCode = otp;
    user.otpExpires = expiration;
    await user.save();
  
    await this.emailService.sendMail(
      email,
      'Password Reset OTP',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #fafafa;">
        <h2 style="color: #333;">🔐 Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">
          Hello,<br>
          You have requested to reset your password. Please use the OTP below to complete the process.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #007BFF; color: #fff; padding: 14px 28px; font-size: 24px; border-radius: 6px; letter-spacing: 3px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #777;">
          This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">
          © ${new Date().getFullYear()} Travel Guide                    . All rights reserved.
        </p>
      </div>
      `
    );
    
    return { message: 'OTP sent to your email' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userModel.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: new Date() }
    });
  
    if (!user) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
  
    return { message: 'OTP is valid' };
  }  

  async resetPasswordWithOtp(email: string, otp: string, newPassword: string) {
    const user = await this.userModel.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: new Date() }, // not expired
    });
  
    if (!user) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otpCode = undefined;
    user.otpExpires = undefined;
  
    await user.save();
  
    return { message: 'Password has been reset successfully' };
  }
  
}
