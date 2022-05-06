import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeOfferDto {

  @IsString()
  @ApiProperty()
  offerId: string;

  @IsString()
  @ApiProperty()
  userId: string;

  // For Image
  filePath?: string;
}