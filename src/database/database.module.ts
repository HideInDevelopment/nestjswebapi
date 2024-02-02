import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async () => {
    return await createConnection({
      host: process.env.DB_LOCALHOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  },
};
@Module({
  providers: [connectionFactory],
  exports: [],
})
export class DatabaseModule {}
