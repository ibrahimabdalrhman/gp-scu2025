import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('send-otp')
  sendOtp(@Body('email') email: string) {
    return this.userService.sendPasswordResetOtp(email);
  }

  @Post('verify-otp')
  senverifyOtpOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.userService.verifyOtp(email,otp);
  }

  @Post('reset-password-otp')
  resetPasswordWithOtp(@Body() body: { email: string, otp: string, newPassword: string }) {
    return this.userService.resetPasswordWithOtp(body.email, body.otp, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Body('oldPassword') oldPassword: string, @Body('newPassword') newPassword: string, @Request() req) {
    return this.userService.changePassword(req.user.userId,oldPassword, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return this.userService.profile(req.user.userId);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Request() req ,  @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
