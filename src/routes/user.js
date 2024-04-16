import UserController from '../controllers/UserController'

export default (app) => {
  app.get('/users', UserController.index);
  app.get('/users/:id', UserController.show);
};