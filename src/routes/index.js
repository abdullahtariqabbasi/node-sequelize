import UserController from '../controllers/UserController'
import { validateSignUpData } from '../middleware/signupValidation';

export default (app) => {
  app.post('/register', validateSignUpData, UserController.signUp);
  app.get('/users', UserController.index);
  app.get('/users/:id', UserController.show);

  app.all('*', (req, res) => res.status(404).send({
    message: 'Not Found!',
  }));
};