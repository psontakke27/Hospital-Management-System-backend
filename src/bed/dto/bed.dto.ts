import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBedDto {
  @IsMongoId()
  roomId: string;

  @IsString()
  // @IsIn(["ICU", "General", "Private", "OT"])
  roomType: string;

  @IsString()
  @IsIn(['available', 'occupied'])
  status: string;

  @IsNumber()
  @IsNotEmpty()
  bedNumber: string;

  // @IsNumber()
  // bedMaxCapacity: number;
}
