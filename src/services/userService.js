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

  async updateUserPassword(userId, password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
  },

  async generateAuthToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },

  async generatePasswordResetToken(user) {
    return jwt.sign({ userId: user.id, key: 'password-reset' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },

  async verifyPasswordResetToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else if ("key" in decodedToken && decodedToken["key"] == 'password-reset') {
          resolve("userId" in decodedToken ? decodedToken['userId'] : false);
        } else {
          resolve(false);
        }
      });
    });
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
