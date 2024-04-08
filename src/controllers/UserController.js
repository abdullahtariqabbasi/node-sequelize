import { Op } from 'sequelize';
import model from '../models';


const { User } = model;

class UserController {
  async signUp(req, res) {
    const { email, password, name, phone } = req.body;
    try {
      const user = await User.findOne({ where: { [Op.or]: [{ phone }, { email }] } });
      if (user) {
        return res.status(422).send({ message: 'User with that email or phone already exists' });
      }

      await User.create({
        name,
        email,
        password,
        phone,
      });
      return res.status(201).send({ message: 'Account created successfully' });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['createdAt', 'ASC']]
      });
      res.status(200).json({ data: users });
    } catch (err) {
      this.setErrorCode(err, res);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).json({ data: user });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Could not perform operation at this time, kindly try again later.' });
    }
  }

  setErrorCode(err, res) {
    console.error(err);
    return res.status(500).send({ message: 'Could not perform operation at this time, kindly try again later.' });
  }
}

export default new UserController();