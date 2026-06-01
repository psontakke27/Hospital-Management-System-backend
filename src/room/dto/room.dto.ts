import { Prop } from "@nestjs/mongoose";
import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateRoomDto {
    @IsMongoId()
    departmentId: string;

    @IsString()
    // @IsIn(["ICU", "General", "Private", "OT"])
    type: string;

    @IsString()
    @IsIn(['active', 'inactive'])
    status: string;

    @IsNumber()
    @IsNotEmpty()
    roomNumber: number;

    @IsString()
    floor?: number;

    @IsNumber()
    roomMaxCapacity: number;


}