import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
    departmentModel: any;
    roomModel: any;

    constructor(private readonly roomService : RoomService){}
    
    @Post()
   async create(@Body() data: CreateRoomDto) {

    const department = await this.departmentModel.findById(data.departmentId);
    if (!department) throw new Error("Department not found");

    const roomCount = await this.roomModel.countDocuments({
      departmentId: data.departmentId,
    });

    if (roomCount >= department.maxRooms) {
      throw new Error("Room limit reached for this department");
    }

    const existing = await this.roomModel.findOne({
      departmentId: data.departmentId,
      roomNumber: data.roomNumber,
    });

    if (existing) {
      throw new Error("Room already exists");
    }

    return this.roomModel.create(data);
  }

    @Get()
    findAll() {
        return this.roomService.findAll();
    }

    @Get(':departmentId')
    findByDepartment(@Body() Body, @Param('departmentId') departmentId:string) {
        return this.roomService.findByDepartment(departmentId);
    }
    

}
