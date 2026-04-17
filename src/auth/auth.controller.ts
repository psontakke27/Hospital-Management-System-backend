import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    console.log("BODY RECEIVED:", body);

    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('admin-test')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  adminTest() {
    return "Only admin can see this";
  }
}