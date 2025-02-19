import * as pgtools from 'pgtools';

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  port: 5432,
};

pgtools
  .createdb(config, 'vehicledb')
  .then((res: any) => {
    console.log('Database created successfully.');
  })
  .catch((err: any) => {
    if (err.name === 'duplicate_database') {
      console.log('Database already exists.');
    } else {
      console.error('Error creating database:', err);
    }
  });
