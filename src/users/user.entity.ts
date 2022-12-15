import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { IsEmail, IsNotEmpty, IsUrl, Length} from "class-validator";
import {WishEntity} from "../wishes/wish.entity";
import {OfferEntity} from "../offers/offer.entity";
import {WishListEntity} from "../wishlists/wishList.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @Length(1, 64)
    @IsNotEmpty()
    username: string;

    @Column({default: 'Пока ничего не рассказал о себе'})
    @Length(1, 200)
    @IsNotEmpty()
    about: string;

    @Column({default: 'https://i.pravatar.cc/300'})
    @IsUrl()
    @IsNotEmpty()
    avatar: string;

    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => WishEntity, (wish) => wish.owner)
    wishes: WishEntity[];

    @OneToMany(()=>OfferEntity, (offer) => offer.user)
    offers: OfferEntity[];

    @OneToMany(()=> WishListEntity, (wishlist) => wishlist.owner)
    wishlists: WishListEntity[];
}