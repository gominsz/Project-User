import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateBookInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  authors?: string;

  @IsDateString()
  @IsOptional()
  publication_date?: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  publishing_company?: string;

  @IsString()
  @IsOptional()
  geners_id?: string;
}
