import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishEntity } from './wish.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishEntity])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
