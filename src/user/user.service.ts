import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

export type User = CreateUserDto;

@Injectable()
export class UserService {
  private connection: Pool;
  constructor(private prismaService: PrismaClient) {
    this.connection = createPool({
      database: 'nest',
      host: 'localhost',
      port: 3306,
      password: 'root',
      user: 'root',
    });
  }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await hash(createUserDto.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwordHash,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      include: {
        books: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) throw new NotFoundException('Usuario não encontrado!');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.book_id) {
      const book = await this.prismaService.book.findUnique({
        where: {
          id: updateUserInput.book_id,
        },
      });
      console.log({ book });
      return this.prismaService.user.update({
        where: { id },
        include: {
          books: true,
        },
        data: {
          books: {
            connect: {
              id: book.id,
            },
          },
        },
      });
    }
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
