import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from 'src/schema/department.schema';
import { HospitalSchema } from 'src/schema/hospital.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Department.name, schema: DepartmentSchema},
        // { name: 'Hospital', schema: HospitalSchema },
  ])
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
// //hospital-id/deparment