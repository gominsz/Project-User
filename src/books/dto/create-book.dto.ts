import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

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
  genres_id: string;

  @IsString()
  @IsOptional()
  publishing_company?: string;

  @IsUUID()
  @IsOptional()
  user_id?: string;
}
