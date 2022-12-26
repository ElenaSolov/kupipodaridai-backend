import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from './wishlist.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CreateWishlistDto } from './dto/createWishlistDto';
import { WishEntity } from '../wishes/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepository: Repository<WishlistEntity>,
  ) {}

  getWishlists(): Promise<WishlistEntity[]> {
    return this.wishlistRepository.find({});
  }

  async getWishlistById(id): Promise<WishlistEntity> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id ${id} not found`);
    }
    return wishlist;
  }

  async createWishlist(
    user: UserEntity,
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistEntity> {
    const { name, description = '', image, itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as WishEntity));
    try {
      const newWishlist = this.wishlistRepository.create({
        name,
        description,
        image,
        items,
        owner: user,
      });
      return await this.wishlistRepository.save(newWishlist);
    } catch (err){
      console.log(err);
      throw new BadRequestException(`${err.detail}`);
    }
    
  }
}
