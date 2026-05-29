import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/schema/room.schema';
import { CreateRoomDto } from './dto/room.dto';
import { Department } from 'src/schema/department.schema';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<Room>,
        @InjectModel(Department.name) private departmentModel
    ){}

    async create( data:CreateRoomDto){

        // 1. Find department
    const department = await this.departmentModel.findById(data.departmentId);
    console.log("🚀 ~ RoomService ~ create ~ department:", department)

    if (!department) {
        throw new Error("Department not found");
    }

    // 2. Count existing rooms
    const roomCount = await this.roomModel.countDocuments({
        departmentId: data.departmentId
    });
    console.log("🚀 ~ RoomService ~ create ~ roomCount:", roomCount)

    // 3. Check capacity
    console.log("🚀 ~ RoomService ~ create ~ department.maxRooms:", department.maxRooms)
    if (roomCount >= department.maxRooms) {
        throw new Error("Room limit reached for this department");
    }

    // 4. Prevent duplicate room number
    const existing = await this.roomModel.findOne({
        departmentId: data.departmentId,
        roomNumber: data.roomNumber
    });
    console.log("🚀 ~ RoomService ~ create ~ existing:", existing)

    if (existing) {
        throw new Error("Room already exists in this department");
    }


        return await this.roomModel.create(data);
    }

    async findAll(){
        return await this.roomModel.find().populate('departmentId');
    }
    
    async findByDepartment(departmentId: string){
        return await this.roomModel.find({departmentId}).populate('departmentId');
    }
}

