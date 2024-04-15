import model from '../models';

const { User } = model;

class UserController {
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
      this.setErrorCode(err, res);
    }
  }

  setErrorCode(err, res) {
    console.error(err);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}

export default new UserController();
