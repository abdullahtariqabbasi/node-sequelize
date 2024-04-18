import Joi from 'joi';

const schemas = {
  signUp: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPassword: Joi.object({
    password: Joi.string().required(),
  }),
};

const middleware = {
  validateSignUpData: async (req, res, next) => {
    try {
      await schemas.signUp.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  },
  validateLoginData: async (req, res, next) => {
    try {
      await schemas.login.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  },
  validateResetPasswordData: async (req, res, next) => {
    try {
      await schemas.resetPassword.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  },
  validateForgotPasswordData: async (req, res, next) => {
    try {
      await schemas.forgotPassword.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }
};

export { middleware };
