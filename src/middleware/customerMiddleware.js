import { serverAnswers } from '../assets/const.js';
import customerSchema from '../schemas/customerSchema.js';

export default async function customerMiddleware(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;

  const validation = customerSchema.validate(
    { name, phone, cpf, birthday },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.badRequest.code).send(errors);
  }
  res.locals = { name, phone, cpf, birthday };
  next();
}
