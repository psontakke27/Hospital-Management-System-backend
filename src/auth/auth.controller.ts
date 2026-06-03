import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UnauthorizedException,
  BadRequestException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { HospitalService } from 'src/hospital/hospital.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly hospitalService: HospitalService,
    private jwtService: JwtService, //injecting JwtService inside service  for create JWT tokens sign data securely later verify tokens (via strategy)
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    console.log('BODY RECEIVED:', body);
    try {
      const { hospitalName, firstName, lastName, email, password } = body;
      console.log('🚀 ~ AuthController ~ signup ~ hospitalName:', hospitalName);
      console.log('🚀 ~   signup ~ password:', password);
      console.log('🚀 ~  signup ~ email:', email);

      let existinghospital = await this.hospitalService.findOne({
        name: hospitalName,
      });
      console.log(
        '🚀 ~ AuthController ~ signup ~ existinghospital:',
        existinghospital,
      );
      if (!existinghospital) {
        throw new BadRequestException('Hospital not found');
      }

      // check user already present
      const existingUser = await this.authService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.authService.createUser({
        hospitalName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: body.role || 'user',
      });
      console.log('🚀 ~ AuthService ~ signup ~ newUser:', newUser);

      return {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
    } catch (err) {
      console.error('Signup Error:', err);
      throw err;
    }
  }

  // return this.authService.signup(body);

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const { email, password } = body;
      const user = await this.authService.findByEmail(email);
      console.log('🚀 ~ AuthService ~ login ~ user:', user);
      if (!user) {
        console.log('🚀 ~ AuthService ~ login ~ !user:', !user);
        throw new UnauthorizedException('User not found');
      }

      const isMatch = await bcrypt.compare(password, user?.password);
      console.log('🚀 ~ AuthService ~ login ~ isMatch:', isMatch);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid Passsword');
      }

      //create payload
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
      console.log('🚀 ~ AuthService ~ login ~ payload:', payload);
      //generate token
      const token = this.jwtService.sign(payload);
      console.log('🚀 ~ AuthService ~ login ~ token:', token);

      return {
        message: 'Login Successful',
        access_token: token, // send token
        // user: {
        //   role: user.role,
        //   email: user.email
        // }
      };
    } catch (err) {
      console.error('login Error:', err);
      throw err;
    }
  }

  @Get('admin-test')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  adminTest() {
    return 'Only admin can see this';
  }
}
