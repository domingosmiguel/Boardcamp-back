import Joi from 'joi';

const newCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.number().integer().min(1000000000).max(99999999999).required(),
  cpf: Joi.number().integer().min(10000000000).max(99999999999).required(),
  birthday: Joi.date().required(),
});

export default newCustomerSchema;
