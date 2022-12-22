import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishEntity } from './wish.entity';
import { CreateWishDto } from './dto/createWishDto';
import { UserEntity } from '../users/user.entity';
import { UpdateWishDto } from './dto/updateWishDto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(WishEntity)
    private wishesRepository: Repository<WishEntity>,
  ) {}

  async getAllWishes(): Promise<WishEntity[]> {
    return this.wishesRepository.find();
  }

  async createWish(createWishDto: CreateWishDto, user): Promise<WishEntity> {
    const { name, image, link, price, description } = createWishDto;
    const newWish = this.wishesRepository.create({
      name,
      image,
      link,
      price,
      description,
      owner: user,
    });
    await this.wishesRepository.save(newWish);
    return newWish;
  }
  getLast(): Promise<WishEntity[]> {
    return this.wishesRepository.find({
      where: {},
      order: { createdAt: 'DESC' },
      take: Number(40),
    });
  }
  getTop(): Promise<WishEntity[]> {
    return this.wishesRepository.find({
      where: {},
      order: { copied: 'DESC' },
      take: Number(20),
    });
  }
  getWishById(id: number): Promise<WishEntity> {
    return this.wishesRepository.findOneBy({ id });
  }
  async updateWish(
    wishId: number,
    user: UserEntity,
    updateWishDto: UpdateWishDto,
  ): Promise<WishEntity> {
    const wish = await this.getWishById(wishId);
    console.log(100, wish);
    if (!wish) {
      throw new NotFoundException(`Wish with id ${wishId} does not exist`);
    } else if (wish.owner.id !== user.id) {
      throw new UnauthorizedException('You can update only your own wishes');
    } else {
      try {
        await this.wishesRepository.update({ id: wishId }, updateWishDto);
        return this.getWishById(wishId);
      } catch (err) {
        console.log(err);
        throw new BadRequestException(`${err.detail}`);
      }
    }
  }
}
