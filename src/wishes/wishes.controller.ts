import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishEntity } from './wish.entity';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  getAllWishes(): Promise<WishEntity[]> {
    return this.wishesService.getAllWishes();
  }
}
