import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.info('Database connected!');
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });
