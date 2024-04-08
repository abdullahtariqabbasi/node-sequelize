import UserController from '../controllers/UserController'
import authenticateJWT from '../middlewares/authenticateJWT';

export default (app) => {
  app.use(authenticateJWT);
  app.get('/users', UserController.index);
  app.get('/users/:id', UserController.show);
};