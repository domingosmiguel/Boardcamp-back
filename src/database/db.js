import pg from 'pg';
import database from '../assets/const';

const { Pool } = pg;
dotenv.config();
const password = process.env.DATABASE_PASSWORD;

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  database,
  user: 'postgres',
  password,
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

export default connection;
