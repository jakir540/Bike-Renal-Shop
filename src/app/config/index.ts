import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  BRYCPT_SLAT: process.env.beycrypt_slat_rounds,
  DEFAULT_PASSWORD: process.env.default_password,
  jwt_acces_secret: process.env.JWT_ACCESS_SECRET_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
};
