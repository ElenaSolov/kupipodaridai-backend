import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { WishEntity } from '../wishes/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getHashedPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, about, email, password, avatar } = createUserDto;
    const hashedPassword = await this.getHashedPassword(password);
    const newUser = this.usersRepository.create({
      username,
      about,
      email,
      password: hashedPassword,
      avatar,
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email or username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }

  async findByUsernamePrivate(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`${username} does not exist`);
    } else {
      return user;
    }
  }
  async findByUsernamePublic(username: string): Promise<Partial<UserEntity>> {
    const user = await this.findByUsernamePrivate(username);
    console.log('user', user);
    const { email, password, wishes, offers, wishlists, ...rest } = user;
    return rest;
  }

  findByUserId(id: number): Promise<UserEntity> {
    console.log(id);
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { password } = updateUserDto;
    if (password) {
      const hashedPassword = await this.getHashedPassword(password);
      updateUserDto = { ...updateUserDto, password: hashedPassword };
    }
    try {
      await this.usersRepository.update({ id }, updateUserDto);
      return this.findByUserId(id);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(`${err.detail}`);
    }
  }

  async findUserWishes(id: number): Promise<WishEntity[]> {
    const user = await this.findByUserId(id);
    return user.wishes;
  }

  async findUserWishesByUsername(username: string): Promise<WishEntity[]> {
    const user = await this.findByUsernamePrivate(username);
    console.log(user);
    console.log(user.wishes);
    return user.wishes;
  }
}
