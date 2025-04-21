import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto, UpdateBusinessDto } from './dto/business.dto';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() data: CreateBusinessDto) {
    return this.businessService.create(data);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBusinessDto) {
    return this.businessService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }

  @Get(':id/services')
  getServices(@Param('id') locationId: string) {
    return this.businessService.getServices(locationId);
  }

  @Get(':id/keywords')
  getKeywords(@Param('id') locationId: string) {
    return this.businessService.getKeywords(locationId);
  }
}
