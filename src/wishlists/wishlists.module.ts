import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistEntity } from './wishlist.entity';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistEntity])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
