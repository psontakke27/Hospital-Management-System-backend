import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Hospital } from "./hospital.schema";



@Schema({timestamps: true})
export class Department{

    @Prop({required : true})
    name:string;

    @Prop({required : true , enum: ['clinical', 'support']})
    type:string;

    @Prop({type: Types.ObjectId, ref: Hospital.name, required:true})
    hospitalId: Types.ObjectId;
        
    @Prop({required: true, min:1 })
    maxRooms: number;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

