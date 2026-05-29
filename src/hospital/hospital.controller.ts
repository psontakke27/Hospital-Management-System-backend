import { Body, Controller ,Get, Post} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';

@Controller('hospital')
export class HospitalController {
    constructor(private readonly hospitalService : HospitalService) {}
        
        @Post()
        create(@Body() body:CreateHospitalDto) {
            console.log("🚀 ~ HospitalController ~ create ~ body:", body)
            return this.hospitalService.create(body);
        }
        
        @Get()
        findAll() {
            return this.hospitalService.findAll();
        }
        
    
}
