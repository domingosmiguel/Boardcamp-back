import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';
import newRentalSchema from '../schemas/newRentalSchema.js';

export default async function newRentalMiddleware(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  const validation = newRentalSchema.validate(
    { customerId, gameId, daysRented },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.badRequest.code).send(errors);
  }
  let pricePerDay;
  try {
    const customerName = await connection.query(
      `SELECT name FROM ${collections.customers} WHERE id=($1)`,
      [customerId]
    );
    if (!customerName.rows) {
      return res.sendStatus(serverAnswers.badRequest.code);
    }
    const game = await connection.query(
      `SELECT * FROM ${collections.games} WHERE id=($1) LIMIT 1`,
      [gameId]
    );
    if (!game.rows) {
      return res.sendStatus(serverAnswers.badRequest.code);
    }
    const rentals = await connection.query(
      `SELECT COUNT(id) AS rentals_count FROM ${collections.rentals} WHERE "gameId"=($1)`,
      [gameId]
    );
    if (
      !rentals.rows ||
      // eslint-disable-next-line dot-notation, camelcase
      rentals.rows[0]['rentals_count'] >= game.rows[0]['stockTotal']
    ) {
      return res.sendStatus(serverAnswers.badRequest.code);
    }
    pricePerDay = game.rows[0].pricePerDay;
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
  const rentDate = new Date();
  const originalPrice = daysRented * pricePerDay;
  res.locals = { customerId, gameId, rentDate, daysRented, originalPrice };
  next();
}
