import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HospitalService } from 'src/hospital/hospital.service';
import { Hospital, HospitalSchema } from 'src/schema/hospital.schema';

// jwtModule used for create token and sign token
//JwtStrategy used to o verify JWT token Used by AuthGuard
//JwtModule.register() its syntax of jwt config

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema } // Create a MongoDB model for User and make it available in this module
    ]),
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
    ]),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    HospitalService
  ],

})
export class AuthModule { }
