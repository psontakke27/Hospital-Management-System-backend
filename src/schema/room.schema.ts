
import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Department } from "./department.schema";


@Schema({ timestamps: true })
export class Room {

    @Prop({ type: Types.ObjectId, ref: Department.name, required: true })
    departmentId: Types.ObjectId;

    @Prop({ required: true, enum: ["ICU", "General", "Private", "OT"] })
    type: string;

    @Prop({ required: true, enum: ['active', 'inactive'] })
    status: string;

    @Prop({ required: true })
    roomNumber: number;

    @Prop()
    floor?: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
