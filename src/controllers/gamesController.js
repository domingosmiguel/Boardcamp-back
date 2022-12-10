import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';

const gamesTable = collections.games;

export const gamesGet = async (req, res) => {
  const name = `%${req.query.name ?? ''}%`;
  try {
    const games = await connection.query(
      `SELECT * FROM ${gamesTable} WHERE name LIKE ($1)`,
      [name]
    );
    return res.send(games.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export const gamesPost = async (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals;
  try {
    const { rowCount: inserted } = await connection.query(
      `INSERT INTO ${gamesTable} (name, image, "stockTotal", "categoryId", "pricePerDay")
      SELECT ($1) AS name, ($2) AS image, ($3) AS "stockTotal", ($4) AS "categoryId", ($5) AS "pricePerDay"
      WHERE NOT EXISTS
      (SELECT name FROM ${gamesTable} WHERE name LIKE ($1))`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    if (inserted === 0) return res.sendStatus(serverAnswers.conflict.code);
    return res.sendStatus(serverAnswers.created.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
