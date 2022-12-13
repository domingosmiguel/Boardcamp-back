import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';
import { rentalsGetQueries } from '../queries/rentalsQueries.js';

const rentalsTable = collections.rentals;

export const rentalsGet = async (req, res) => {
  const { customerId, gameId } = req.query;
  try {
    let rentals;
    if (customerId) {
      rentals = await connection.query(rentalsGetQueries.customerFilter, [
        customerId,
      ]);
    } else if (gameId) {
      rentals = await connection.query(rentalsGetQueries.gameFilter, [gameId]);
    } else {
      rentals = await connection.query(rentalsGetQueries.noFilter);
    }
    return res.send(rentals.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const rentalsPost = async (req, res) => {
  const { customerId, gameId, rentDate, daysRented, originalPrice } =
    res.locals;
  try {
    const insertText = `INSERT INTO ${rentalsTable} ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, NULL, $5, NULL)`;
    await connection.query(insertText, [
      customerId,
      gameId,
      rentDate,
      parseInt(daysRented, 10),
      originalPrice,
    ]);
    return res.sendStatus(serverAnswers.created.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const rentalsPostReturn = async (req, res) => {
  const { id } = req.params;
  const millisecondsPerDay = 864 * 10 ** 5;
  const d = new Date();
  try {
    const selectText = `SELECT "rentDate", "daysRented", "originalPrice" 
                          FROM ${rentalsTable} 
                         WHERE id=($1)`;
    const rental = await connection.query(selectText, [id]);
    const { rentDate, daysRented, originalPrice } = rental.rows[0];
    const delayDays = Math.ceil(
      (d.getTime() - (rentDate.getTime() + daysRented * millisecondsPerDay)) /
        millisecondsPerDay
    );
    const delayFee = (delayDays * originalPrice) / daysRented;

    const updateText = `UPDATE ${rentalsTable} 
                           SET "returnDate"=($1), "delayFee"=($2) 
                         WHERE id=($3)`;
    const { rowCount: inserted } = await connection.query(updateText, [
      d,
      delayFee,
      id,
    ]);
    if (inserted === 0) return res.sendStatus(serverAnswers.conflict.code);
    return res.sendStatus(serverAnswers.created.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const rentalsDelete = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(serverAnswers.badRequest.code);
  try {
    const { rowCount: deleted } = await connection.query(
      `DELETE FROM ${rentalsTable} WHERE id=($1) AND "returnDate" IS NOT NULL`,
      [id]
    );
    if (deleted === 0) return res.sendStatus(serverAnswers.badRequest.code);
    return res.sendStatus(serverAnswers.success.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
