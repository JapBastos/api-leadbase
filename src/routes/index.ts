import { Router } from 'express';

import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import permissionsRouter from './permissions.routes';
import rolesRouter from './roles.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import authorizedRole from '../middlewares/authorizedRole';

const routes = Router();

permissionsRouter.use(ensureAuthenticated);
rolesRouter.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', authorizedRole(['ADMIN_ROLE']), permissionsRouter);
routes.use('/roles', rolesRouter);

export default routes;
