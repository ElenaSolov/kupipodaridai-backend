import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WishEntity} from "./wish.entity";

@Module({imports: [TypeOrmModule.forFeature([WishEntity])],})
export class WishesModule {}
