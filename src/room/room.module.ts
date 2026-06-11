import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schema/room.schema';
import { Department, DepartmentSchema } from 'src/schema/department.schema';
import { DepartmentService } from 'src/department/department.service';
import { Bed, BedSchema } from 'src/schema/bed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
        { name: Bed.name, schema: BedSchema },
      { name: Department.name, schema: DepartmentSchema },
    ])
  ],
  providers: [RoomService, DepartmentService],
  controllers: [RoomController]
})
export class RoomModule { }
