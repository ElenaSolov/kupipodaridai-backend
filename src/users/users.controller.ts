import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/getUser.decorator';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@GetUser() user: UserEntity): Promise<UserEntity> {
    return this.usersService.findByUsername(user.username);
  }

  @Patch('me')
  updateUser(
    @GetUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(user.id, updateUserDto);
  }
}
