import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export type UpdateBookInput = Partial<CreateBookDto>;
