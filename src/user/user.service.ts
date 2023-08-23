import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaClient) {}
  
  async create(createUserDto: CreateUserDto) {
    const passwordHash = await hash(createUserDto.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwordHash,
      },
    });

		return {
			id: user.id,
			name: user.name,
			email: user.email	
		}
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      }
    });
  }


  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: { id }
    });
  }
}