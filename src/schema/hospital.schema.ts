import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Hospital {
    @Prop({ required: true, trim: true, lowercase: true })
    name: string

    @Prop({ required: true, trim: true, lowercase: true })
    address: string

    @Prop()
    contactNumber: string;
    static _id: any;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);


// Do not allow two records with the same name AND address combination
HospitalSchema.index(
    { name: 1, address: 1 },
    { unique: true }
)