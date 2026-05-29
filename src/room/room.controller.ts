import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
    departmentModel: any;
    roomModel: any;

    constructor(private readonly roomService : RoomService,){}
    @InjectModel(Department.name)
private departmentModel: Model<Department>
    
    @Post()
   async create(@Body() data: CreateRoomDto) {
   console.log("🚀 ~ RoomController ~ create ~ data:", data)

   console.log("🚀 ~ RoomController ~ create ~ data.departmentId:", data.departmentId)
    const department = await this.departmentModel.findById(data.departmentId);
    console.log("🚀 ~ RoomController ~ create ~ department:", department)
    if (!department) throw new Error("Department not found");

    const roomCount = await this.roomModel.countDocuments({
      departmentId: data.departmentId,
    });
    console.log("🚀 ~ RoomController ~ create ~ roomCount:", roomCount)

    if (roomCount >= department.maxRooms) {
      console.log("🚀 ~ RoomController ~ create ~ roomCount >= department.maxRooms:", roomCount >= department.maxRooms)
      console.log("🚀 ~ RoomController ~ create ~ department.maxRooms):", department.maxRooms)
      throw new Error("Room limit reached for this department");
    }

    const existing = await this.roomModel.findOne({
      departmentId: data.departmentId,
      roomNumber: data.roomNumber,
    });
    console.log("🚀 ~ RoomController ~ create ~ existing:", existing)

    if (existing) {
      throw new Error("Room already exists");
    }

    return this.roomModel.create(data);
  }

    @Get(':departmentId')
    findByDepartment(@Body() Body, @Param('departmentId') departmentId:string) {
        return this.roomService.findByDepartment(departmentId);
    }
    

}
