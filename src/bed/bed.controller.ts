import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BedService } from './bed.service';
import { CreateBedDto } from './dto/bed.dto';

@Controller('bed')
export class BedController {
  constructor(private readonly bedService: BedService) {}

  // @Post()
  // async create(@Body() data: CreateBedDto) {
  //   return await this.bedService.create(data);
  // }
  @Get()
  findAll() {
    return this.bedService.findAll();
  }

  @Get(':roomId')
  findByRoom(@Body() Body, @Param('roomId') roomId: string) {
    return this.bedService.findByRoom(roomId);
  }

  @Patch(':bedId')
  updateBedStatus(
    @Param('bedId') bedId:string, 
    @Body('status')  status:string
  ){
    console.log("🚀 ~ BedController ~ updateBedStatus ~ bedId:", bedId)
    return this.bedService.updateBedStatus(bedId,status);
  }
}
