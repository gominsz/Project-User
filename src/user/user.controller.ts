import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly useService: UserService) {}


  @Get()
  findAll() {
    return this.useService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {   
    return this.useService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.useService.findOne(id);
  }

  @Patch(':id') 
  update(
    @Param('id') id: string, 
    @Body()  updateUserInput:  UpdateUserInput) {
    return this.useService.update(id,  updateUserInput);
  }

  @HttpCode(204) // representa No content (Sem conteudo)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.useService.remove(id);
  }
}
