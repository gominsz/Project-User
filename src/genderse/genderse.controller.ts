import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderseService } from './genderse.service';
import { CreateGenderseDto } from './dto/create-genderse.dto';
import { UpdateGenderseDto } from './dto/update-genderse.dto';

@Controller('genderse')
export class GenderseController {
  constructor(private readonly genderseService: GenderseService) {}

  @Post()
  create(@Body() createGenderseDto: CreateGenderseDto) {
    return this.genderseService.create(createGenderseDto);
  }

  @Get()
  findAll() {
    return this.genderseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenderseDto: UpdateGenderseDto,
  ) {
    return this.genderseService.update(id, updateGenderseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderseService.remove(id);
  }
}
