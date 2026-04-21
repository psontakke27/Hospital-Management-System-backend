import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty({message :"Hospital name is required"})
    name : string;

    @IsString()
    @IsNotEmpty({message: "Address is required"})
    address: string;

    @IsString()
    @IsNotEmpty({ message:"Contact-number is required"})
    @Matches(/^[6-9][0-9]{9}$/ , {
        message:"Contact number must be 10 digits and start from 6-9",
    })
    contactNumber: string;
}