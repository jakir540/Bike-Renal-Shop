import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log('Loaded PORT:', process.env.PORT);
console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

const port = parseInt(process.env.PORT || '3000');

export default {
  port: port,
  database_url: process.env.DATABASE_URL,
};
