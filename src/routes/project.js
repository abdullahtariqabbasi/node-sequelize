import ProjectController from '../controllers/ProjectController'
import { middleware } from '../middlewares/validations/project';

export default (app) => {
  app.get('/projects', ProjectController.index);
  app.post('/projects', middleware.validateProjectData, ProjectController.create);
  app.get('/projects/:id', ProjectController.show);
};