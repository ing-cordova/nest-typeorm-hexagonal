import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/context/api/**/domain/*.model.ts'], // Ajusta según la ubicación de tus entidades
  migrations: ['src/migrations/*.ts'], // Carpeta para migraciones
  migrationsTableName: 'migrations', // Opcional: tabla personalizada para migraciones
});

export default dataSource;
