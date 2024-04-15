import AuthController from '../controllers/AuthController'
import { middleware } from '../middlewares/userAuthValidation';

export default (app) => {
  app.post('/register', middleware.validateSignUpData, AuthController.signUp);
  app.post('/login', middleware.validateLoginData, AuthController.login);
};