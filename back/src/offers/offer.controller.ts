import { Controller, Post, Body, Get, Param, Put, Delete, UploadedFile, UseInterceptors, Inject, UseGuards, Query } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../core/middleware/file-management.middleware';
import { Offer } from './offer.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { from, Observable } from 'rxjs';
import { PaginationParams } from 'src/pagination-params';
import { OfferDto } from './dto/offer.dto';
import { OfferService } from './offer.service';
import { LikeOfferDto } from './dto/like-offer.dto';

@Controller('offers')
@ApiTags('Offer')
export class OffersController {

  constructor(private readonly OffersService: OfferService) { }

  @Post('/with-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  async addProductWithPhoto(@UploadedFile() file, @Body() Offer: OfferDto): Promise<OfferDto> {
    return await this.OffersService.addOfferWithPhoto(file, Offer);
  }

  // addOffer without file "photo" data sent as json 
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'addOffer' })
  @Post()
  addOffer(@Body() OfferDto: OfferDto): Observable<Offer> {
    return from(this.OffersService.addOffer(OfferDto));
  }

  @ApiOperation({ summary: 'getPaginatedOffers' })
  @Get()
  async getPaginatedOffers(@Query() { skip, limit }: PaginationParams) {
    return this.OffersService.findAll(Number(skip), Number(limit));
  }

  @ApiOperation({ summary: 'likeOffer' })
  @Post('/like')
  @UseGuards(AuthGuard('jwt'))
  async likeOffer(@Body() likeOfferDto: LikeOfferDto): Promise<Offer> {
    return await this.OffersService.likeOffer(likeOfferDto);
  }

  @ApiOperation({ summary: 'dislikeOffer' })
  @Post('/dislike')
  @UseGuards(AuthGuard('jwt'))
  async dislikeOffer(@Body() likeOfferDto: LikeOfferDto): Promise<Offer> {
    return await this.OffersService.dislikeOffer(likeOfferDto);
  }

  @ApiOperation({ summary: 'getOffers' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getOffers(): Promise<Offer[]> {
    return await this.OffersService.getOffers();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'getOfferById' })
  @Get(':id')
  getOffer(@Param('id') OfferId: string) {
    return this.OffersService.getOfferById(OfferId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'updateOffer' })
  @Put(':id')
  async updateOffer(@Param('id') OfferId: string, @Body() offer: Offer): Promise<Offer> {
    return this.OffersService.updateOffer(OfferId, offer);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'removeOffer' })
  @Delete(':id')
  async removeOffer(@Param('id') OfferId: string) {
    await this.OffersService.deleteOffer(OfferId);
    return null;
  }
}
