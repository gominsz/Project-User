import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserTokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: { email: string; password: string }): Promise<UserToken> {
    //Transforma o user em um JWT
    const userFinded = await this.userService.findOneByEmail(user.email);
    console.log(userFinded);
    const jwtToken = this.jwtService.sign(userFinded);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    //Busca um usuario por email
    const user = await this.userService.findOneByEmail(email);
    //Caso usuario exista
    if (user) {
      //checar se a senha que foi informada correspooinde a hash que esta no banco
      // Valida se a senha passada é a mesma registrada no banco
      const isPasswaordValid = await bcrypt.compare(password, user.password);

      //Caso a senha seja valida, retorna os dados do usuario
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
