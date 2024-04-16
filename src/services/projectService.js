import model from '../models';

const { Project, Skill } = model;

class ProjectService {
  async getAllProjects() {
    return await Project.findAll({
      include: [{
        model: Skill,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      }],
      order: [['createdAt', 'ASC']]
    });
  }

  async getProjectById(id) {
    return await Project.findByPk(id, {
      include: [{
        model: Skill,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      }],
    });
  }

  async createProject(name, userId, skills) {
    const project = await Project.create({ name, userId });

    if (skills && skills.length > 0) {
      const projectSkills = await Promise.all(skills.map(skillId =>
        Skill.findByPk(skillId)
      ));

      await project.addSkills(projectSkills);
    }

    return project;
  }
}

export default new ProjectService();
