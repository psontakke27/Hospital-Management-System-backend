import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}), // used for load .env
    MongooseModule.forRoot(process.env.mongo_url!), //Trust me, mongo_url will NOT be undefined
    AuthModule],

})
export class AppModule {}
