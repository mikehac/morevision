import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { VehicleCreateDto } from './dto/vehicle.create.dto';
import { VehicleUpdateDto } from './dto/vehicle.update.dto';
import { VehicleService } from './vehicle.service';
import { VehicleGetDto } from './dto/vehicle.get.dto';
import { AllExceptionsFilter } from 'src/customFilters/exceptions.filter';

@Controller('vehicle')
@UseFilters(AllExceptionsFilter)
export class VehicleController {
  constructor(private service: VehicleService) {}

  @Get()
  public async findAll(@Query() status?: VehicleGetDto) {
    return await this.service.findAll(status);
  }

  @Post()
  public async create(@Body() vehicle: VehicleCreateDto) {
    return await this.service.create(vehicle);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() vehicle: VehicleUpdateDto,
  ) {
    return await this.service.update(id, vehicle);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
