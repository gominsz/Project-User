import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateUserDto {

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
