import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {IsDate, IsEmail, IsNotEmpty, IsUrl, Length} from "class-validator";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 64)
    @IsNotEmpty()
    username: string;

    @Column()
    @Length(1, 200)
    @IsNotEmpty()
    about: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    avatar: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

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
    wishes: [];

    @Column()
    @IsNotEmpty()
    offers: [];

    @Column()
    @IsNotEmpty()
    wishlists: [];
}