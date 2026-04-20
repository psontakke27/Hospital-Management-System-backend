import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Hospital{
    @Prop ({required: true})
    name: string

    @Prop()
    address: string

    @Prop()
    contactNumber: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);