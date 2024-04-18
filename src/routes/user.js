import UserController from '../controllers/UserController'
import upload from '../middlewares/uploadMiddleware';

export default (app) => {
  app.get('/users', UserController.index);
  app.get('/users/:id', UserController.show);
  app.post('/users/:id/profile-picture', upload.single('profilePicture'), UserController.uploadProfilePicture);
};