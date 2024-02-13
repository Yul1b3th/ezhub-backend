import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from './config/constants';

import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AmenityModule } from './amenity/amenity.module';
import { RoomAmenityModule } from './room-amenity/room-amenity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        autoLoadEntities: true,
        synchronize: true,
        logging: 'all', // Aquí es donde cambias el nivel de logging
      }),
      inject: [ConfigService],
    }),
    PropertiesModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    TransactionsModule,
    FavoritesModule,
    PreferencesModule,
    AmenityModule,
    RoomAmenityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
