import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';
import { UserEntity } from '../users/user.entity';
import { WishEntity } from '../wishes/wish.entity';

@Entity()
export class WishListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(0, 250)
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.wishlists)
  @JoinColumn()
  owner: UserEntity;

  @OneToMany(() => WishEntity, (wish) => wish.id)
  items: WishEntity[];
}
