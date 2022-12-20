import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/getUser.decorator';
import { UpdateUserDto } from './dto/updateUserDto';
import { WishEntity } from '../wishes/wish.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@GetUser() user: UserEntity): Promise<UserEntity> {
    return this.usersService.findByUserId(user.id);
  }

  @Patch('me')
  updateUser(
    @GetUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(user.id, updateUserDto);
  }

  @Get('/me/wishes')
  getUserWishes(@GetUser() user: UserEntity): Promise<WishEntity[]> {
    return this.usersService.findUserWishes(user.id);
  }

  @Get(':username')
  getUserByName(
    @Param('username') username: string,
  ): Promise<Partial<UserEntity>> {
    return this.usersService.findByUsername(username);
  }
}
