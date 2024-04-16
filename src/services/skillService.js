import model from '../models';

const { Skill } = model;

const skillService = {
  async getSkillById(id) {
    return Skill.findByPk(id);
  },
};

export default skillService;
