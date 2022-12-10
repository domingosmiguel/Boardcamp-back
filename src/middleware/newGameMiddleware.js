import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';
import newGameSchema from '../schemas/newGameSchema.js';

export default async function newGameMiddleware(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const validation = newGameSchema.validate(
    { name, image, stockTotal, categoryId, pricePerDay },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.badRequest.code).send(errors);
  }
  try {
    const categoryName = await connection.query(
      `SELECT name FROM ${collections.categories} WHERE id=($1)`,
      [categoryId]
    );
    if (!categoryName.rows) {
      return res.sendStatus(serverAnswers.badRequest.code);
    }
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
  res.locals = { name, image, stockTotal, categoryId, pricePerDay };
  next();
}
