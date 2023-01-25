import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ssl: false,
      type: 'postgres',
      host: 'localhost',
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DATABASE'),
      port: 5432,
      synchronize: true,
      entities: [__dirname + '../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '../migrations/*{.ts,.js}'],
    }),
  }),
];
