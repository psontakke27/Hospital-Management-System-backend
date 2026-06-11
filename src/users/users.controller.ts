import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) { }
    @Post()
      findByRole(@Body() body: { role: string }) {
        return this.usersService.findByRole(body.role);
    }
}
