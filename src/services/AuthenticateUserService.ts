import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  cpf: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ cpf, senha }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { cpf } });

    if (!user) {
      throw new Error('CPF ou senha incorretos!');
    }

    const senhaMatched = await compare(senha, user.senha);

    if (!senhaMatched) {
      throw new Error('CPF ou senha incorretos!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
