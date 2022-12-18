import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishEntity } from './wish.entity';
import { CreateWishDto } from './dto/createWishDto';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  getAllWishes(): Promise<WishEntity[]> {
    return this.wishesService.getAllWishes();
  }

  @Post()
  createWish(@Body() createWishDto: CreateWishDto): Promise<WishEntity> {
    return this.wishesService.createWish(createWishDto);
  }
}
