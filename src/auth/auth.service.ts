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

    async login(body: LoginDto) {
        const { email, password } = body;
        console.log("🚀  ~ login ~ password:", password)
        console.log("🚀  ~ login ~ email:", email)
        const user = await this.userModel.findOne({ email });
        console.log("🚀 ~ AuthService ~ login ~ user:", user)
        if (!user) {
            console.log("🚀 ~ AuthService ~ login ~ !user:", !user)
            throw new UnauthorizedException("User not found");
        }

        const isMatch = await bcrypt.compare(password, user?.password);
        console.log("🚀 ~ AuthService ~ login ~ isMatch:", isMatch)

        if (!isMatch) {
            throw new UnauthorizedException("Invalid Passsword");
        }

        //create payload
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };
        console.log("🚀 ~ AuthService ~ login ~ payload:", payload)
        //generate token
        const token = this.jwtService.sign(payload);
        console.log("🚀 ~ AuthService ~ login ~ token:", token)

        return {
            message: "Login Successful",
            access_token: token, // send token
        }
    }

    async signup(body: SignupDto) {
        try {
            const { hospitalName, firstName, lastName, email, password } = body;
            console.log("🚀 ~   signup ~ password:", password)
            console.log("🚀 ~  signup ~ email:", email)

            let existinghospital = await this.hospitalService.findOne({
                hospitalName
            })
            if (!existinghospital) {
                throw new BadRequestException("hospital does not exists");
            }

            // check user already present
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                throw new BadRequestException("email already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new this.userModel({
                hospitalName,
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: body.role || 'user',
            });
            console.log("🚀 ~ AuthService ~ signup ~ newUser:", newUser)

            await newUser.save();
            return {
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        } catch (err) {
            console.error("Signup Error:", err);
            throw err;
        }

    }


}


// crud operation
