import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { nome, cpf, senha, roles } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      nome,
      cpf,
      senha,
      roles,
    });

    delete user.senha;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
