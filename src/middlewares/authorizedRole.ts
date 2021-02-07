/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization;
  const usersRepository = getCustomRepository(UsersRepository);

  if (!authHeader) {
    throw new Error('Token JWT não encontrado!');
  }

  const [, token] = authHeader.split(' ');

  const payload = decode(token);

  const user = usersRepository.findOne(payload?.sub, { relations: ['roles'] });

  return user;
}

function authorizedRole(roles: string[]) {
  const isAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(request);

    const userRoles = user?.roles.map(role => role.nome);

    const checkRolesExists = userRoles?.some(r => roles.includes(r));

    if (checkRolesExists) {
      return next();
    }

    return response.status(401).json({ message: 'Não autorizado!' });
  };

  return isAuthorized;
}

export default authorizedRole;
