import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const port = parseInt(process.env.PORT || '3000');

export default {
  port: port,
  database_url: process.env.DATABASE_URL,
};
