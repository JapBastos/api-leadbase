import { Router } from 'express';

import CreateRoleService from '../services/CreateRoleService';

const rolesRouter = Router();

rolesRouter.post('/', async (request, response) => {
  try {
    const { nome, descricao, permissoes } = request.body;

    const createRole = new CreateRoleService();

    const role = await createRole.execute({
      nome,
      descricao,
      permissoes,
    });

    return response.json(role);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default rolesRouter;
