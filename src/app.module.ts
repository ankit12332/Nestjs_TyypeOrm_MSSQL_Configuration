import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get('MAIN_DB_HOST'),
          port: parseInt(configService.get('MAIN_DB_PORT')),
          database: configService.get('MAIN_DB_DATABASE'),
          username: configService.get('MAIN_DB_USERNAME'),
          password: configService.get('MAIN_DB_PASSWORD'),
          // schema: configService.get('MAIN_DB_SCHEMA'),
          entities: [Student],
          synchronize: true,
          options: {
            encrypt: false,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
