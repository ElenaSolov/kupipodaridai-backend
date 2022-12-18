import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUserDto';
import { UserEntity } from '../users/user.entity';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.signUp(createUserDto);
  }
}