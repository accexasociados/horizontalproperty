import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { enviroments } from './enviroments';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { PropertyModule } from './apis/property/property.module';
import { LoginModule } from './apis/login/login.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        const uri = `${configService.get('database.host')}://${configService.get('database.user')}:${configService.get('database.pass')}@cluster0.1aeqcau.mongodb.net/${configService.get('database.name')}?retryWrites=true&w=majority`;
        return { uri };
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    PropertyModule,
    LoginModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
