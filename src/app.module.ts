import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DEVDBHOST,
    //   port: 3306,
    //   username: process.env.DEVDBUSER,
    //   password: process.env.DEVDBPASSWORD,
    //   database: process.env.DEVDBNAME,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
