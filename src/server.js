import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(categoriesRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
