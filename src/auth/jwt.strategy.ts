import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy } from 'passport-jwt'



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            //extract token from header
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

            //secret key match with JwtModule
            secretOrKey : 'mySecretKey',

        });
    }

    //runs after token is verified
    async validate(payload: any)  {
        return payload; //available as req user
    }
}