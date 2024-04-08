import AuthController from '../controllers/AuthController'
import { validateSignUp } from '../middleware/signupValidation';

export default (app) => {
  app.post('/register', validateSignUp, AuthController.signUp);
  app.get('/users', AuthController.index);
  app.get('/users/:id', AuthController.show);

  app.all('*', (req, res) => res.status(404).send({
    message: 'Not Found!',
  }));
};