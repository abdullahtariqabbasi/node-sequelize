import userService from '../services/userService';

class UserController {
  async index(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}

export default new UserController();
