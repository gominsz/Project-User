import { PartialType } from '@nestjs/mapped-types';
import { CreateGenderseDto } from './create-genderse.dto';

export class UpdateGenderseDto extends PartialType(CreateGenderseDto) {}
