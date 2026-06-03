import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { HospitalService } from 'src/hospital/hospital.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService, //injecting JwtService inside service  for create JWT tokens sign data securely later verify tokens (via strategy)
        private readonly hospitalService: HospitalService
    ) { }

    async findByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async createUser(data: any) {
        const newUser = new this.userModel(data);
        return await newUser.save();
    }

}


// crud operation
