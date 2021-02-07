import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PermissionsRepository from '../repositories/PermissionsRepository';

import CreatePermissionService from '../services/CreatePermissionService';
import DeletePermissionService from '../services/DeletePermissionService';

const permissionsRouter = Router();

permissionsRouter.post('/', async (request, response) => {
  try {
    const { nome, descricao } = request.body;

    const createUser = new CreatePermissionService();

    const user = await createUser.execute({
      nome,
      descricao,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

permissionsRouter.delete('/', async (request, response) => {
  const { nome } = request.body;
  const permissionsRepository = getCustomRepository(PermissionsRepository);

  const permission = await permissionsRepository.findOne({
    where: { nome },
  });

  console.log(permission);

  if (!permission) {
    throw new Error('Permissão não existe!');
  }

  await permissionsRepository.delete(permission.id);

  return response.json(permission);
});

permissionsRouter.get('/', async (request, response) => {
  const permissionsRepository = getCustomRepository(PermissionsRepository);

  const permissions = await permissionsRepository.find();

  console.log(permissions);

  if (!permissions) {
    throw new Error('Ainda não há permissões cadastradas!');
  }

  return response.json(permissions);
});

export default permissionsRouter;
