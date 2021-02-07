import { getCustomRepository } from 'typeorm';

import Role from '../models/Role';
import PermissionsRepository from '../repositories/PermissionsRepository';
import RolesRepository from '../repositories/RolesRepository';

interface Request {
  nome: string;
  descricao: string;
  permissoes: string[];
}

class CreateRoleService {
  public async execute({
    nome,
    descricao,
    permissoes,
  }: Request): Promise<Role> {
    const rolesRepository = getCustomRepository(RolesRepository);
    const permissionsRepository = getCustomRepository(PermissionsRepository);

    const checkRolesExists = await rolesRepository.findOne({
      where: { nome },
    });

    if (checkRolesExists) {
      throw new Error('Role já existe!');
    }

    const checkPermissionsExists = await permissionsRepository.findByIds(
      permissoes,
    );

    const role = rolesRepository.create({
      nome,
      descricao,
      permissoes: checkPermissionsExists,
    });

    await rolesRepository.save(role);

    return role;
  }
}

export default CreateRoleService;
