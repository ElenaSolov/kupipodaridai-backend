import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto/createOfferDto';
import { UserEntity } from '../users/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offersRepository: Repository<OfferEntity>,
    @Inject(WishesService)
    private readonly wishesService: WishesService,
    private dataSource: DataSource,
  ) {}

  getAll(): Promise<OfferEntity[]> {
    return this.offersRepository.find({
      where: {},
      relations: ['user', 'item'],
    });
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: UserEntity,
  ): Promise<OfferEntity> {
    const { amount, hidden, itemId } = createOfferDto;
    const wish = await this.wishesService.getWishById(itemId);
    if (this.wishesService.checkOwner(wish, user)) {
      throw new BadRequestException(
        'You can not make offers for your own wishes',
      );
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const newOffer = this.offersRepository.create({
      amount,
      hidden,
      item: wish,
      user,
    });
    try {
      await this.offersRepository.save(newOffer);
      await this.wishesService.updateWishRaised(wish, amount);
      return newOffer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err.code);
    } finally {
      await queryRunner.release();
    }
  }
}