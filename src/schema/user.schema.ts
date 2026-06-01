import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true }) //Create a MongoDB schema for this clas
export class User {

    @Prop({ required: true })
    hospitalName: String;

    @Prop({ required: true })
    firstName: String;

    @Prop({ required: true })
    lastName: String;

    @Prop({ required: true, unique: true }) // prevent from duplicate emails
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, enum: ['admin', 'user'], default: 'user' })
    role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User); // This converts your class into a MongoDB schema