import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('me')
  // getUser () : Promise<UserEntity> {
  //         return this.usersService.getUser();
  // }
}
