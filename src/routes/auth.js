import AuthController from '../controllers/AuthController'
import { middleware } from '../middlewares/validations/userAuth';

export default (app) => {
  app.post('/register', middleware.validateSignUpData, AuthController.signUp);
  app.post('/login', middleware.validateLoginData, AuthController.login);
  app.post('/forgot-password', middleware.validateForgotPasswordData, AuthController.forgotPassword);
  app.post('/reset-password', middleware.validateResetPasswordData, AuthController.resetPassword);
};