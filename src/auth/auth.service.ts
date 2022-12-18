import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/createUserDto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
