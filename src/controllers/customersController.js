import { collections, serverAnswers } from '../assets/const.js';
import connection from '../database/db.js';

const customersTable = collections.customers;

export const customersGet = async (req, res) => {
  const cpf = `${req.query.cpf ?? ''}%`;
  try {
    const customers = await connection.query(
      `SELECT * FROM ${customersTable} WHERE cpf LIKE ($1)`,
      [cpf]
    );
    return res.send(customers.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const customersGetById = async (req, res) => {
  const id = req.params;

  try {
    const customers = await connection.query(
      `SELECT * FROM ${customersTable} WHERE id=($1)`,
      [id]
    );

    return res.send(customers.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const customersPost = async (req, res) => {
  const { name, phone, cpf, birthday } = res.locals;
  try {
    const { rowCount: inserted } = await connection.query(
      `INSERT INTO ${customersTable} (name, phone, cpf, birthday)
      SELECT ($1) AS name, ($2) AS phone, ($3) AS cpf, ($4) AS birthday
      WHERE NOT EXISTS
      (SELECT name FROM ${customersTable} WHERE cpf='($3)')`,
      [name, phone, cpf, birthday]
    );
    if (inserted === 0) return res.sendStatus(serverAnswers.conflict.code);
    return res.sendStatus(serverAnswers.created.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
export const customersPut = async (req, res) => {
  const id = req.params;
  const { name, phone, cpf, birthday } = res.locals;

  try {
    const customers = await connection.query(
      `UPDATE ${customersTable} SET name=($2), phone=($3), cpf=($4), birthday=($5) 
        WHERE id=($1) 
          AND 
            (id IN
            (SELECT id FROM ${customersTable} WHERE cpf='($4)')
            OR NOT EXISTS
            (SELECT id FROM ${customersTable} WHERE cpf='($4)')
            )        
      `,
      [id, name, phone, cpf, birthday]
    );

    return res.send(customers.rows);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
