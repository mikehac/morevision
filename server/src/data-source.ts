import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'vehicledb',
  entities: [Vehicle],
  migrations: ['src/migrations/*.ts'], // Ensures migration files are recognized
  synchronize: false, // Keep false in production
  logging: true,
});

if (require.main === module) {
  AppDataSource.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((err) =>
      console.error('Error during Data Source initialization', err),
    );
}
