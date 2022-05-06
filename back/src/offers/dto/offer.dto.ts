import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  userId: string;

  // For Image
  filePath?: string;
}