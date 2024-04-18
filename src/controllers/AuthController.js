import emailService from '../services/emailService';
import userService from '../services/userService';

class AuthController {
  async signUp(req, res) {
    const { email, password, name, phone } = req.body;
    try {
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(422).send({ message: 'User with that email already exists' });
      }

      await userService.createUser(email, password, name, phone);
      await emailService.sendRegisterEmail(email,
        'Welcome Onboard',
        'Account Created Successfully!');
      return res.status(201).send({ message: 'Account created successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Something went wrong' });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'No such user present' });
      }

      const token = await userService.generatePasswordResetToken(user);
      await emailService.sendForgotPasswordEmail(user.email, token)
      return res.status(200).send({ message: 'Forgot Password Email sent successfully' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.details ? error.details[0].message : 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    const { password } = req.body;

    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
      }
      const userId = await userService.verifyPasswordResetToken(token);
      console.log('userId: ' + userId);
      if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      await userService.updateUserPassword(userId, password);
      return res.status(200).send({ message: 'Password reset successfully' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.details ? error.details[0].message : 'Internal server error' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await userService.verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = await userService.generateAuthToken(user);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.details ? error.details[0].message : 'Internal server error' });
    }
  }
}

export default new AuthController();
