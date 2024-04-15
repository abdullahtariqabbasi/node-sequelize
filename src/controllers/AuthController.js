import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import model from '../models';

const { User } = model;

const SALT_ROUNDS = 10;

class AuthController {
  async signUp(req, res) {
    const { email, password, name, phone } = req.body;
    try {
      const user = await User.findOne({ where: { [Op.or]: [{ phone }, { email }] } });
      if (user) {
        return res.status(422).send({ message: 'User with that email or phone already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });
      return res.status(201).send({ message: 'Account created successfully' });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'Something went wrong' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      await bcrypt.compare(password, user.password).then(r => {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
      })
      .catch((err) => {
        console.error(err.message)
        return res.status(401).json({ message: 'Invalid email or password' });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}

export default new AuthController();
