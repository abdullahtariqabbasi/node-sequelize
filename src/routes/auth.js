import AuthController from '../controllers/AuthController'
import { validateSignUpData } from '../middlewares/signupValidation';

export default (app) => {
  app.post('/register', validateSignUpData, AuthController.signUp);
  app.post('/login', AuthController.login);
};