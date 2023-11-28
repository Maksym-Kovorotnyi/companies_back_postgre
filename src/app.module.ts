import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Asdafaga12!',
      username: 'postgres',
      entities: [User, Company],
      database: 'companies',
      synchronize: true,
      logging: true,
      schema: 'user',
    }),
    UserModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
