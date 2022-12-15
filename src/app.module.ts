import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { UserEntity } from './users/user.entity';
import {WishEntity} from "./wishes/wish.entity";
import {WishListEntity} from "./wishlists/wishList.entity";
import {OfferEntity} from "./offers/offer.entity";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'nest_project',
    entities: [UserEntity, WishEntity, WishListEntity, OfferEntity],
    synchronize: true,
  }), WishesModule, WishlistsModule, UsersModule, OffersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}