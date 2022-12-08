const database = 'boardcamp';
const collections = {
  categories: 'categories',
  customers: 'customers',
  games: 'games',
  rentals: 'rentals',
};

const serverAnswers = {
  databaseProblem: { code: 500 },
  created: {
    code: 201,
  },
  success: {
    code: 200,
  },
  badRequest: {
    code: 400,
  },
  unauthorized: {
    code: 401,
  },
  notFound: {
    code: 404,
  },
  conflict: {
    code: 409,
  },
  unprocessableEntity: {
    code: 422,
  },
};
export { database, collections, serverAnswers };
