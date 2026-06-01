import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
  departmentModel: any;
  roomModel: any;

  constructor(private readonly roomService: RoomService) { }

  @Post()
  async create(@Body() data: CreateRoomDto) {
    return await this.roomService.create(data);
  }

  @Get(':departmentId')
  findByDepartment(@Body() Body, @Param('departmentId') departmentId: string) {
    return this.roomService.findByDepartment(departmentId);
  }

}
