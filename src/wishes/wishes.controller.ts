import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishEntity } from './wish.entity';
import { CreateWishDto } from './dto/createWishDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { UserEntity } from '../users/user.entity';
import { UpdateWishDto } from './dto/updateWishDto';

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
  @Get('top')
  getTop(): Promise<WishEntity[]> {
    return this.wishesService.getTop();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getWishById(@Param('id') id: string): Promise<WishEntity> {
    return this.wishesService.getWishById(Number.parseInt(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createWish(@Body() createWishDto: CreateWishDto): Promise<WishEntity> {
    return this.wishesService.createWish(createWishDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateWish(
    @Param('id') id: number,
    @GetUser() user: UserEntity,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<WishEntity> {
    return this.wishesService.updateWish(id, user, updateWishDto);
  }
}
