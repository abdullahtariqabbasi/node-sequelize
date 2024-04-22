import projectService from '../services/projectService';
import model from '../models';

const { Project, Skill } = model;

class ProjectController {
  async index(req, res) {
    try {
      const projects = await await Project.findAll({
        include: [{
          model: Skill,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        }],
        order: [['createdAt', 'ASC']]
      });
      res.status(200).json({ data: projects });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  async show(req, res) {
    const { id } = req.params;
    try {
      const project = await projectService.getProjectById(id);
      if (!project) {
        return res.status(404).send({ message: 'Project not found' });
      }
      return res.status(200).json({ data: project });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  async create(req, res) {
    const { name, userId, skills } = req.body;

    try {
      const project = await Project.create({ name, userId });

      if (skills && skills.length > 0) {
        const projectSkills = await Promise.all(skills.map(skillId =>
          Skill.findByPk(skillId)
        ));

        await project.addSkills(projectSkills);
      }

      return res.status(201).json({ message: 'Project created successfully', data: project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

export default new ProjectController();
