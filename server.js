import app from './app.js';
import dotenv from 'dotenv';
import connection from './database/connection.js';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
connection();

const server = app.listen(3000, () => {
  console.log('app is listining at port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    console.log('unhandled Rejection error ... shutting down');
    process.exit(1);
  });
});
