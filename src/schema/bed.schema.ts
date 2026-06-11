import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Room } from './room.schema';

@Schema({ timestamps: true })
export class Bed {
   @Prop({
    type: Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  roomId: Types.ObjectId;

  @Prop({ required: true })
  roomNumber: number;

  @Prop({ required: true })
  bedNumber: string;

  @Prop({
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available',
  })
  status: string;

  
}
export const BedSchema = SchemaFactory.createForClass(Bed);
