import Joi from 'joi';

const newGameSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1).required(),
  pricePerDay: Joi.number().integer().min(1).required(),
});

export default newGameSchema;
