import config from './app/config';

import mongoose from 'mongoose';
import app from './app';

const port = config.port;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
