import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserInput {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  book_id?: string;
}
