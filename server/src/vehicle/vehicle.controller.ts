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
import { Vehicle } from 'src/entities/vehicle.entity';

@Controller('vehicle')
@UseFilters(AllExceptionsFilter)
export class VehicleController {
  constructor(private service: VehicleService) {}

  @Get()
  public async findAll(@Query() status?: VehicleGetDto): Promise<Vehicle[]> {
    return this.service.findAll(status);
  }

  @Post()
  public async create(@Body() vehicle: VehicleCreateDto) {
    return this.service.create(vehicle);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() vehicle: VehicleUpdateDto,
  ) {
    return this.service.update(id, vehicle);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
