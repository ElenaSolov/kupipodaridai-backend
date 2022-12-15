import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from './wishList.entity';

@Module({ imports: [TypeOrmModule.forFeature([WishListEntity])] })
export class WishlistsModule {}
