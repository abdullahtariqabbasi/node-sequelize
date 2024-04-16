import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.number().integer().positive().required(),
  skills: Joi.array().items(Joi.number().integer().positive()).required(),
});

const middleware = {
  validateProjectData: async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }
};

export { middleware };
