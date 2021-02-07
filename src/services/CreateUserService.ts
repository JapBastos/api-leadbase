import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import RolesRepository from '../repositories/RolesRepository';

interface Request {
  nome: string;
  cpf: string;
  senha: string;
  roles: string[];
}

class CreateUserService {
  public async execute({ nome, cpf, senha, roles }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const rolesRepository = getCustomRepository(RolesRepository);

    const checkUsersExists = await usersRepository.findOne({
      where: { cpf },
    });

    if (checkUsersExists) {
      throw new Error('CPF já cadastrado!');
    }

    const senhaHashed = await hash(senha, 8);

    const checkRolesExists = await rolesRepository.findByIds(roles);

    const user = usersRepository.create({
      nome,
      cpf,
      senha: senhaHashed,
      roles: checkRolesExists,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
