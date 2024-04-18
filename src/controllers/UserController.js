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

  async uploadProfilePicture(req, res) {
    try {
      const { id } = req.params;
      const profilePicturePath = req.file.path;
      const user = await userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.profilePicture = profilePicturePath;
      await user.save();
  
      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default new UserController();
