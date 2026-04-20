import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}), // used for load .env
    MongooseModule.forRoot(process.env.mongo_url!), //Trust me, mongo_url will NOT be undefined
    AuthModule, HospitalModule],

})
export class AppModule {}
