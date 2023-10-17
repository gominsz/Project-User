import { Injectable } from '@nestjs/common';
import { CreateGenderseDto } from './dto/create-genderse.dto';
import { UpdateGenderseDto } from './dto/update-genderse.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GenderseService {
  constructor(private prismaService: PrismaClient) {}
  async create(createGenderseDto: CreateGenderseDto) {
    return this.prismaService.genres.create({
      data: {
        name: createGenderseDto.name,
      },
    });
  }

  findAll() {
    return this.prismaService.genres.findMany();
  }

  findOne(id: string) {
    return this.prismaService.genres.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateGenderseInput: UpdateGenderseDto) {
    return this.prismaService.genres.update({
      where: {
        id,
      },
      data: updateGenderseInput,
    });
  }

  async remove(id: string) {
    return this.prismaService.genres.delete({
      where: { id },
    });
  }
}
