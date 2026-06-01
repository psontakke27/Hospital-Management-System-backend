import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) { }

    @Post()
    create(@Body() body: CreateDepartmentDto) {
        console.log("🚀 ~ DepartmentController ~ create ~ body:", body)
        return this.departmentService.create(body);
    }


    @Get(':hospitalId')
    findByHospital(@Body() body, @Param('hospitalId') hospitalId: string) {
        return this.departmentService.findByHospital(hospitalId);
    }


}
