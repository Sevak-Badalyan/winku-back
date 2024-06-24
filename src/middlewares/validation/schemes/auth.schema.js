// NPM modules
import Joi from 'joi';

const AuthSchema = {
  loginSchema: {
    body: Joi.object({
      username: Joi.string().min(4).required(),
      password: Joi.string().min(3).required()
    })
  },
  registerSchema: {
    body: Joi.object({
      username: Joi.string().min(4).required(),
      password: Joi.string().min(4).required(),
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(3).required(),
      email: Joi.string().min(5).required(),
      role: Joi.string().valid('User', 'Admin').required()
    })
  }
    
};

export default AuthSchema;
