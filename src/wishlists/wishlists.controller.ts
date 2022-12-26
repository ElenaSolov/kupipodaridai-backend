import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { AuthGuard } from '@nestjs/passport';
import { WishlistEntity } from './wishlist.entity';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { CreateWishlistDto } from './dto/createWishlistDto';
import { UserEntity } from '../users/user.entity';

@Controller('wishlists')
@UseGuards(AuthGuard('jwt'))
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}

  @Get()
  getWishlists(): Promise<WishlistEntity[]> {
    return this.wishlistService.getWishlists();
  }

  @Get(':id')
  getWishlistById(@Param('id') id: string): Promise<WishlistEntity> {
    return this.wishlistService.getWishlistById(id);
  }

  @Post()
  createWishlist(
    @GetUser() user: UserEntity,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistEntity> {
    return this.wishlistService.createWishlist(user, createWishlistDto);
  }
}
