import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { OffersModule } from './offers/offer.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    ProductsModule,
    WinstonModule,
    OffersModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  static port: number | string;
  constructor(private _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
    console.log('AppModule.port', AppModule.port);
  }
}
