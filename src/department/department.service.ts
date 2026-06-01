import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from 'src/schema/department.schema';
import { CreateDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {

    constructor(
        @InjectModel(Department.name)
        private departmentModel: Model<Department>,
    ) { }

    async create(data: CreateDepartmentDto) {
        console.log("🚀 ~ DepartmentService ~ create ~ data:", data)
        return await this.departmentModel.create(data);
    }
    async findById(departmentId: any) {
        return await this.departmentModel.findById(departmentId)
    }

    async findAll() {
        console.log("all department ")
        return await this.departmentModel.find().populate('hospitalId');
    }

    async findByHospital(hospitalId: string) {
        console.log("🚀 ~ DepartmentService ~ findByHospital ~ hospitalId:", hospitalId)
        return await this.departmentModel.find({ hospitalId }).populate('hospitalId')
    }

    // .populate This replaces the ID with actual hospital data

}
