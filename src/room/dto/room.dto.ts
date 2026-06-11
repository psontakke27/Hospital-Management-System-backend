import { Prop } from '@nestjs/mongoose';
import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsMongoId()
  departmentId: string;

   @IsMongoId()
  hospitalId: string;

  
  @IsString()
  floor: number;

  @IsString()
  doctor?:string;

  @IsString()
  nurses?: string[];
  
}
