import { Module } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';
import { Room, RoomSchema } from 'src/schema/room.schema';
import { BedService } from './bed.service';
import { BedController } from './bed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bed, BedSchema } from 'src/schema/bed.schema';
import { Department } from 'src/schema/department.schema';
import { DepartmentService } from 'src/department/department.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bed.name, schema: BedSchema },
      { name: Room.name, schema: RoomSchema},
      {name : Department.name, schema: Department}
    ]),
  ],
  providers: [ BedService , RoomService, DepartmentService],
  controllers: [BedController],
})
export class BedModule {}
