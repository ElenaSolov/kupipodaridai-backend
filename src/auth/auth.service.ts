import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/createUserDto';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from '../users/dto/signinUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './IJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async signIn(signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    const { username, password } = signinUserDto;
    console.log(1, username);
    const user = await this.usersService.findByUsername(username);
    console.log(2, user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { userId: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login details');
    }
  }
}
