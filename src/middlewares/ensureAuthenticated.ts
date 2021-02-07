import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token JWT não encontrado!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodificado = verify(token, authConfig.jwt.secret);

    console.log(decodificado);

    return next();
  } catch {
    throw new Error('Token JWT inválido!');
  }
}

export default ensureAuthenticated;
