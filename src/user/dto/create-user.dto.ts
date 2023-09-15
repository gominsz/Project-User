import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";


export class CreateUserDto {

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;


  
  @IsNotEmpty()
  password: string;
}
