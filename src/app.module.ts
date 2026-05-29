import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HospitalModule } from './hospital/hospital.module';
import { DepartmentModule } from './department/department.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true}), // used for load .env
    MongooseModule.forRoot(process.env.mongo_url!), //Trust me, mongo_url will NOT be undefined
    AuthModule,
    HospitalModule,
    DepartmentModule, 
    RoomModule],

})
export class AppModule {}
