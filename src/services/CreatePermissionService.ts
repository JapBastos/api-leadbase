import { getCustomRepository } from 'typeorm';

import Permission from '../models/Permission';
import PermissionsRepository from '../repositories/PermissionsRepository';

interface Request {
  nome: string;
  descricao: string;
}

class CreatePermissionService {
  public async execute({ nome, descricao }: Request): Promise<Permission> {
    const permissionsRepository = getCustomRepository(PermissionsRepository);

    const checkPermissionsExists = await permissionsRepository.findOne({
      where: { nome },
    });

    if (checkPermissionsExists) {
      throw new Error('Permissão já existe!');
    }

    const permission = permissionsRepository.create({
      nome,
      descricao,
    });

    await permissionsRepository.save(permission);

    return permission;
  }
}

export default CreatePermissionService;
