import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { Prisma, PrismaClient } from '@prisma/client';
import { createPool } from 'mysql2';
import { UpdateBookInput } from './dto/update-book.dto';

export type User = CreateBookDto;

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaClient) {}
  async create(createBookDto: CreateBookDto) {
    if (createBookDto.user_id) {
      const genderse = await this.prismaService.genres.findFirstOrThrow({
        where: {
          id: createBookDto.genres_id,
        },
      });
      const user = await this.prismaService.user.findUnique({
        where: {
          id: createBookDto.user_id,
        },
      });
      return this.prismaService.book.create({
        data: {
          name: createBookDto.name,
          authors: createBookDto.authors,
          description: createBookDto.description,
          publication_date: createBookDto.publication_date,
          publishing_company: createBookDto.publishing_company,
          geners: {
            connect: {
              id: genderse.id,
            },
          },
          users: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
    return this.prismaService.book.create({
      data: {
        name: createBookDto.name,
        authors: createBookDto.authors,
        description: createBookDto.description,
        publication_date: createBookDto.publication_date,
        publishing_company: createBookDto.publishing_company,
      },
    });
  }

  async findAll() {
    return this.prismaService.book.findMany({
      include: {
        users: true,
        geners: true,
      },
    });
  }

  async findOne(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        authors: true,
        publication_date: true,
        publishing_company: true,
      },
    });
    if (!book) throw new NotFoundException('Livro não encontrado!');
    return book;
  }
  async findOneByName(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });

    return book;
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    return this.prismaService.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  async remove(id: string) {
    return this.prismaService.book.delete({
      where: { id },
    });
  }
}
