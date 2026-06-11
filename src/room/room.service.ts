import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/schema/room.schema';
import { CreateRoomDto } from './dto/room.dto';
import { DepartmentService } from 'src/department/department.service';
import { BedService } from 'src/bed/bed.service';
import { Bed } from 'src/schema/bed.schema';
import { DepartmentCapacity } from 'src/utils/enum';

@Injectable()
export class RoomService {
  findById(roomId: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
     @InjectModel(Bed.name) private bedModel: Model<Bed>,
    private readonly departmentService: DepartmentService,

  ) {}

  async create(data: CreateRoomDto) {

    // 1. Find department
    const department = await this.departmentService.findById(data.departmentId);
    console.log('🚀 ~ RoomService ~ create ~ department:', department);

    switch (department?.name){
      case 'Private': if(data.doctor) {
        throw new Error(" Doctor is required for Private department")
      }
      break;

      case 'OPD':  if(!data.nurses) {
        throw new Error('At least one nurse is required for OPD');
      } 
      break;

      case 'Emergency': if(!data.nurses) {
        throw new Error('Emergency room requires nurses')
      }
      break;
    }

    
    if (!department) {
      throw new Error('Department not found');
    }
    const bedCapacity = DepartmentCapacity[department.name];

    // 2. Count existing rooms
    const roomCount = await this.roomModel.countDocuments({
      departmentId: data.departmentId,
      hospitalId: data.hospitalId
    });
    console.log('🚀 ~ RoomService ~ create ~ roomCount:', roomCount);

    // 3. Check capacity
    console.log(
      '🚀 ~ RoomService ~ create ~ department.maxRooms:',
      department.maxRooms,
    );
    if (roomCount >= department.maxRooms) {
      throw new Error('Room limit reached for this department');
    }

// find last room on this floor 
const lastRoom =  await this.roomModel.findOne({floor: data.floor, hospitalId: data.hospitalId}).sort({ roomNumber:-1});
console.log("🚀 ~ RoomService ~ create ~ lastRoom:", lastRoom)
let roomNumber:any;
if(!lastRoom){
  roomNumber= data.floor*100+1; // 101 201 301
  console.log("🚀 ~ RoomService roomNumber:", roomNumber)
}else{
  roomNumber = lastRoom.roomNumber+1;
  console.log("🚀 ~ RoomService ~ create ~ roomNumber:", roomNumber)
}

const room = await this.roomModel.create({
  ...data,
  roomNumber,
})
console.log("🚀 ~ RoomService ~ create ~ room:", room)

for (let i = 1; i <= bedCapacity; i++) {
 const bed=  await this.bedModel.create({
    roomId: room._id,
    roomNumber: room.roomNumber,
    bedNumber:`${room.roomNumber}-${i}`,
    status:'available'
  })
  console.log("Created Bed:", bed);
}
return room
  }

  async findAll() {
    return await this.roomModel.find().populate('departmentId');
  }

  async findByDepartment(departmentId: string) {
    return await this.roomModel.find({ departmentId }).populate('departmentId');
  }
}
