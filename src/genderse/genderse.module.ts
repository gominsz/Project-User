import { Module } from '@nestjs/common';
import { GenderseService } from './genderse.service';
import { GenderseController } from './genderse.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [GenderseController],
  providers: [GenderseService, PrismaClient],
})
export class GenderseModule {}
