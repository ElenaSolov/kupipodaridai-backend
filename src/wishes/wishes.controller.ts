import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishEntity } from './wish.entity';
import { CreateWishDto } from './dto/createWishDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  getAllWishes(): Promise<WishEntity[]> {
    return this.wishesService.getAllWishes();
  }

  @Get('last')
  getLast(): Promise<WishEntity[]> {
    return this.wishesService.getLast();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createWish(@Body() createWishDto: CreateWishDto): Promise<WishEntity> {
    return this.wishesService.createWish(createWishDto);
  }
}
