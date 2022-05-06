import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLogger } from '../core/services/logger.service';
import { LikeOfferDto } from './dto/like-offer.dto';
import { OfferDto } from './dto/offer.dto';
import { Offer } from './offer.model';

@Injectable()
export class OfferService implements OnModuleInit {
  constructor(@InjectModel('Offer') private readonly OfferModel: Model<Offer>, private appLogger: AppLogger
  ) { }

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  async addOfferWithPhoto(file, OfferDto: OfferDto): Promise<Offer> {
    const newOffer = new this.OfferModel(OfferDto);
    if (file) {
      newOffer.filePath = file.path;
    }

    await newOffer.save();

    return newOffer.toObject({ versionKey: false });
  }

  /**
   * Add Offer without picture
   * @param OfferDto 
   * @returns 
   */
  async addOffer(OfferDto: OfferDto): Promise<Offer> {
    const newOffer = new this.OfferModel(OfferDto);
    await newOffer.save();
    return newOffer.toObject({ versionKey: false });
  }

  async getOffers(): Promise<Offer[]> {
    this.appLogger.warn(' getOffers ')
    this.appLogger.error(' getOffers ', 'test')
    this.appLogger.log(' getOffers ')
    return await this.OfferModel.find();
  }

  async findAll(documentsToSkip = 0, limitOfDocuments?: number) {
    const findQuery = this.OfferModel
      .find()
      .sort([['likes', 'descending']])
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }
    const results = await findQuery;
    const count = await this.OfferModel.count();

    return { results, count };
  }

  async getOfferById(OfferId: string): Promise<Offer> {
    return await this.OfferModel.findById({ _id: OfferId });
  }

  async updateOffer(OfferId: string, Offer: Partial<Offer>): Promise<Offer> {
    return this.OfferModel.findByIdAndUpdate({ _id: OfferId }, Offer, { new: true });
  }

  async likeOffer(likeOfferDto: LikeOfferDto): Promise<Offer> {
    const offer: Offer = await this.OfferModel.findById({ _id: likeOfferDto.offerId });

    offer.likes = offer.likes + 1;
    offer.likedBy.push(likeOfferDto.userId);

    const hasDisliked = offer.dislikedBy.includes(likeOfferDto.userId);

    if (hasDisliked) {
      offer.dislikedBy.splice(offer.dislikedBy.indexOf(likeOfferDto.offerId), 1);
      offer.dislikes = offer.dislikes - 1;
    }

    return this.OfferModel.findByIdAndUpdate({ _id: likeOfferDto.offerId }, offer, { new: true });
  }

  async dislikeOffer(likeOfferDto: LikeOfferDto): Promise<Offer> {
    const offer: Offer = await this.OfferModel.findById({ _id: likeOfferDto.offerId });

    offer.dislikes = offer.dislikes + 1;
    offer.dislikedBy.push(likeOfferDto.userId);

    const hasliked = offer.likedBy.includes(likeOfferDto.userId);

    if (hasliked) {
      offer.likedBy.splice(offer.likedBy.indexOf(likeOfferDto.offerId), 1);
      offer.likes = offer.likes - 1;
    }

    return this.OfferModel.findByIdAndUpdate({ _id: likeOfferDto.offerId }, offer, { new: true });
  }

  async deleteOffer(prodId: string): Promise<void> {
    return await this.OfferModel.deleteOne({ _id: prodId })
  }

}
