import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from './wishlist.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CreateWishlistDto } from './dto/createWishlistDto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepository: Repository<WishlistEntity>,
  ) {}

  getWishlists(): Promise<WishlistEntity[]> {
    return this.wishlistRepository.find({});
  }

  async createWishlist(
    user: UserEntity,
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistEntity> {
    const { itemsId } = createWishlistDto;
    const newWishlist = this.wishlistRepository.create({
      ...createWishlistDto,
      items: itemsId,
      owner: user,
    });
    return this.wishlistRepository.save(newWishlist);
  }
}
