import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async () => {
    return await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'V=zTE)mq7yXDkA6',
      database: 'webapi2',
    });
  },
};
@Module({
  providers: [connectionFactory],
  exports: [],
})
export class DatabaseModule {}
