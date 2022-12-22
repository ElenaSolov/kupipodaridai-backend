import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishEntity } from './wish.entity';
import { CreateWishDto } from './dto/createWishDto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(WishEntity)
    private wishesRepository: Repository<WishEntity>,
  ) {}

  async getAllWishes(): Promise<WishEntity[]> {
    return this.wishesRepository.find();
  }

  async createWish(createWishDto: CreateWishDto): Promise<WishEntity> {
    const { name, image, link, price, description } = createWishDto;
    const newWish = this.wishesRepository.create({
      name,
      image,
      link,
      price,
      description,
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
  getWishById(id): Promise<WishEntity> {
    return this.wishesRepository.findOneBy({ id });
  }
}
