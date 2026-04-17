import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


// jwtModule used for create token and sign token
//JwtStrategy used to o verify JWT token Used by AuthGuard
//JwtModule.register() its syntax of jwt config

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema} // Create a MongoDB model for User and make it available in this module
    ]),
    JwtModule.register({
      secret:'mySecretKey',
      signOptions: {expiresIn: '1d'}
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],

})
export class AuthModule {}
