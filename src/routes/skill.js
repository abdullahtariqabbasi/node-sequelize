import SkillController from '../controllers/SkillController'

export default (app) => {
  app.get('/skills', SkillController.index);
  app.get('/skills/:id', SkillController.show);
};