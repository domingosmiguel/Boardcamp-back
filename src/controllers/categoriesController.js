import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';

const categoriesTable = collections.categories;

export const categoriesGet = async (req, res) => {
  try {
    const categories = await connection.query(
      `SELECT * FROM ${categoriesTable}`
    );
    return res.send(categories.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export const categoriesPost = async (req, res) => {
  const name = req.body.name.toLowerCase();
  if (!name) return res.sendStatus(serverAnswers.badRequest.code);
  try {
    const { rowCount: inserted } = await connection.query(
      `INSERT INTO ${categoriesTable} (name)
      SELECT ($1)
      WHERE NOT EXISTS
      (SELECT name FROM ${categoriesTable} WHERE name LIKE ($1));`,
      [name]
    );
    if (inserted === 0) return res.sendStatus(serverAnswers.conflict.code);
    return res.sendStatus(serverAnswers.created.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
