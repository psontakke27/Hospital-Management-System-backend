import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hospital } from "src/schema/hospital.schema";
import { CreateHospitalDto } from "./dto/create-hospital.dto";



@Injectable()
export class HospitalService {

    // Give me the MongoDB model for Hospital so I can use it inside this service.
    constructor(
        @InjectModel(Hospital.name)
        private hospitalModel: Model<Hospital>,
    ) { }

    async create(data: CreateHospitalDto) {
        console.log("🚀 ~ HospitalService ~ create ~ data:", data)
        return await this.hospitalModel.create(data);
    }
    async findOne(hospitalName: any) {
        return await this.hospitalModel.findOne(hospitalName);
    }
    async findAll() {
        return await this.hospitalModel.find();
    }


}