import model from '../models';
import skillService from '../services/skillService';

const { Skill } = model;

class SkillController {
  async index(req, res) {
    try {
      const skills = await Skill.findAll();
      res.status(200).json({ data: skills });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const skill = await skillService.getSkillById(id);
      if (!skill) {
        return res.status(404).send({ message: 'Skill not found' });
      }
      return res.status(200).json({ data: skill });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}

export default new SkillController();
