import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/createOfferDto';
import { OfferEntity } from './offer.entity';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(AuthGuard('jwt'))
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Post()
  createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() user,
  ): Promise<OfferEntity> {
    return this.offersService.createOffer(createOfferDto, user);
  }
}
