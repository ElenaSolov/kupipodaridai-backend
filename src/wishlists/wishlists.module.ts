import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from './wishList.entity';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishListEntity])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
