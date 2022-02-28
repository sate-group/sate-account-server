import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'sate-test-db.cb9r0etdspdp.us-east-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'AFfQnzOODsZlknMSnRZt',
  database: 'account',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(options),
    UserModule,
  ],
})
export class AppModule {}
