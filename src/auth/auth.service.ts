import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserTokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: { email: string; password: string }): UserToken {
    //Transforma o user em um JWT
    const userFinded = this.userService.findOneByEmail(user.email);

    const jwtToken = this.jwtService.sign(userFinded);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      //checar se a senha que foi informada correspooinde a hash que esta no banco

      const isPasswaordValid = await bcrypt.compare(password, user.password);

      if (isPasswaordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    //se chegar aqui, significa que náo encontrou um User e/ou a senha náo corresponde
    throw new Error('Email addres or password provided is incorrect.');
  }
}
