import { collections } from '../assets/const.js';

const customersTable = collections.customers;
const categoriesTable = collections.categories;
const rentalsTable = collections.rentals;
const gamesTable = collections.games;

const rentalsGetQueries = {
  customerFilter: `SELECT ${rentalsTable}.*,
        JSON_BUILD_OBJECT(
          'id',
          ${customersTable}.id,
          'name',
          ${customersTable}.name
          ) AS customer,
        JSON_BUILD_OBJECT(
          'id', 
          ${gamesTable}.id,
          'name',
          ${gamesTable}.name,
          'categoryId',
          ${gamesTable}."categoryId",
          'categoryName',
          ${categoriesTable}."name"
          ) AS game
    FROM ${rentalsTable}
    JOIN ${customersTable} ON ${rentalsTable}."customerId"=${customersTable}.id
    JOIN ${gamesTable} ON ${rentalsTable}."gameId"=${gamesTable}.id
    JOIN ${categoriesTable} ON ${gamesTable}."categoryId"=${categoriesTable}.id
    WHERE "customerId"=($1)`,
  gameFilter: `SELECT ${rentalsTable}.*,
        JSON_BUILD_OBJECT(
          'id',
          ${customersTable}.id,
          'name',
          ${customersTable}.name
          ) AS customer,
        JSON_BUILD_OBJECT(
          'id', 
          ${gamesTable}.id,
          'name',
          ${gamesTable}.name,
          'categoryId',
          ${gamesTable}."categoryId",
          'categoryName',
          ${categoriesTable}."name"
          ) AS game
    FROM ${rentalsTable}
    JOIN ${customersTable} ON ${rentalsTable}."customerId"=${customersTable}.id
    JOIN ${gamesTable} ON ${rentalsTable}."gameId"=${gamesTable}.id
    JOIN ${categoriesTable} ON ${gamesTable}."categoryId"=${categoriesTable}.id
    WHERE "gameId"=($1)`,
  noFilter: `SELECT ${rentalsTable}.*,
        JSON_BUILD_OBJECT(
          'id',
          ${customersTable}.id,
          'name',
          ${customersTable}.name
          ) AS customer,
        JSON_BUILD_OBJECT(
          'id', 
          ${gamesTable}.id,
          'name',
          ${gamesTable}.name,
          'categoryId',
          ${gamesTable}."categoryId",
          'categoryName',
          ${categoriesTable}."name"
          ) AS game
    FROM ${rentalsTable}
    JOIN ${customersTable} ON ${rentalsTable}."customerId"=${customersTable}.id
    JOIN ${gamesTable} ON ${rentalsTable}."gameId"=${gamesTable}.id
    JOIN ${categoriesTable} ON ${gamesTable}."categoryId"=${categoriesTable}.id`,
};

export { rentalsGetQueries };
