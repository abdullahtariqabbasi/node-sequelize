import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

const { User } = model;

const SALT_ROUNDS = 10;

const userService = {
  async createUser(email, password, name, phone) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
  },

  async generateAuthToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },

  async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  },

  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  },

  async getAllUsers() {
    return User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'ASC']]
    });
  },

  async getUserById(id) {
    return User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  },
};

export default userService;
