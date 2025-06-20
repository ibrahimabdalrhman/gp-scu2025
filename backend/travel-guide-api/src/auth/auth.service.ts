// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createAuthDto: CreateAuthDto): Promise<any> {
    const existingUser = await this.userService.findByEmail(createAuthDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const existingPhoneNumber = await this.userService.findByEmailOrPhone(
      createAuthDto.email,
      createAuthDto.phone_number,
    );
    if (existingPhoneNumber) {
      throw new UnauthorizedException('Phone Number already exists');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = await this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    return newUser;
  }
}
