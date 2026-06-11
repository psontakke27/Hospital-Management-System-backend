import { Injectable } from '@nestjs/common';
import { CreateBedDto } from './dto/bed.dto';
import { throwError } from 'rxjs';
import { RoomService } from 'src/room/room.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bed } from 'src/schema/bed.schema';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class BedService {
  constructor(
    @InjectModel(Bed.name) private bedModel: Model<Bed>,
    private readonly departmentService: DepartmentService,
    private readonly roomService: RoomService,
  ) {}
  async create(data: CreateBedDto) {
    // find room
    const room = await this.roomService.findById(data.roomId);

    // if (!room) {
    //   throw new Error('Room not found');
    // }

    //count existing bed
    const bedCount = await this.bedModel.countDocuments({
      roomId: data.roomId,
    });

    //check capacity

    // if (bedCount >= room.bedMaxCapacity) {
    //   throw new Error('bed limit reached for this room');
    // }
    // Prevent duplicate bed number
    const existingBed = await this.bedModel.findOne({
      roomId: data.roomId,
      bedNumber: data.bedNumber,
    });

    if (existingBed) {
      throw new Error('bed already exists in this room');
    }
    return await this.bedModel.create(data);
  }
async updateBedStatus(bedId:string , status:string){
    console.log("🚀 ~ BedService ~ updateBedStatus ~ status:", status)
    console.log("🚀 ~ BedService ~ updateBedStatus ~ bedId:", bedId)
  return this.bedModel.findByIdAndUpdate(
    bedId,{status},{new:true}
  )
}
  //
  async findAll() {
    return await this.bedModel.find().populate('roomId');
  }

  async findByRoom(roomId: string) {
    return await this.bedModel.find({ roomId : new Types.ObjectId(roomId)});

  }
}
