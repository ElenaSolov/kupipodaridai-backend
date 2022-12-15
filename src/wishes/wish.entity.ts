import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsNotEmpty, IsUrl, Length, Min } from "class-validator";
import {UserEntity} from "../users/user.entity";

@Entity()
export class WishEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 250)
    @IsNotEmpty()
    name: string;

    @Column()
    @Length(1, 1024)
    @IsNotEmpty()
    description: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    link: string;

    @Column()
    @IsNotEmpty()
    @IsUrl()
    image: string;

    @Column()
    @IsNotEmpty()
    @Min(1)
    price: number;

    @Column()
    @IsNotEmpty()
    @Min(1)
    raised: number;

    @Column()
    @IsNotEmpty()
    copied: number;

    @Column()
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @Column()
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;

    @Column()
    @IsNotEmpty()
    owner: UserEntity;

    @Column()
    @IsNotEmpty()
    offers: [];

    @Column()
    @IsNotEmpty()
    wishlists: [];
}