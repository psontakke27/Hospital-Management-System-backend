import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateAuthDto {}


export class SignupDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()// unique
    email:string;

    @MinLength(6) //encrypt
    password: string;

    @IsOptional()
      role?: 'admin' | 'user';
}

export class LoginDto {
     @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
}

//campaire encrytion on login
//

