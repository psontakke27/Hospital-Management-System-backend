import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsIn(['clinical', 'support'])
    type: string;

    @IsMongoId()
    hospitalId: string;

    @IsNumber()
    maxRooms: number;
}