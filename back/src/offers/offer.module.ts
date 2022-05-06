import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { WinstonModule, } from 'nest-winston';
import { AppLogger } from '../core/services/logger.service';
import { OffersController } from './offer.controller';
import { OfferSchema } from './offer.model';
import { OfferService } from './offer.service';


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([{ name: 'Offer', schema: OfferSchema }]),
    WinstonModule
  ],
  controllers: [OffersController],
  providers: [OfferService, AppLogger],
})
export class OffersModule { }
