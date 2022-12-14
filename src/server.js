import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import categoriesRoutes from './routes/categoriesRoutes.js';
import costumersRoutes from './routes/customersRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import rentalsRoutes from './routes/rentalsRoutes.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(categoriesRoutes);
server.use(gamesRoutes);
server.use(costumersRoutes);
server.use(rentalsRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
