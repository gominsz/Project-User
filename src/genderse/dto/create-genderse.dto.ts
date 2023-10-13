import { IsString } from 'class-validator';

export class CreateGenderseDto {
  @IsString()
  name: string;
}
