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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('vehicle')
@UseFilters(AllExceptionsFilter)
export class VehicleController {
  constructor(private service: VehicleService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all vehicles or filter by status',
    description: 'Fetch a list of vehicles with optional filters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [Vehicle],
    example: [
      {
        id: 1,
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active',
        createdAt: '2021-07-01T12:00:00Z',
        updatedAt: '2021-07-01T12:00:00Z',
      },
    ],
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  public async findAll(@Query() status?: VehicleGetDto): Promise<Vehicle[]> {
    return this.service.findAll(status);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new vehicle',
    description: 'Create a new vehicle with the provided details.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [Vehicle],
    example: {
      licensePlate: 'ABC123',
      manufacturer: 'Toyota',
      model: 'Corolla',
      status: 'active',
      example: {
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active',
        createdAt: '2025-02-18T07:43:59.572Z',
        updatedAt: '2025-02-22T12:40:07.291Z',
      },
    },
  })
  public async create(@Body() vehicle: VehicleCreateDto) {
    return this.service.create(vehicle);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a vehicle',
    description: 'Update the details of an existing vehicle.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [Vehicle],
    example: {
      licensePlate: 'ABC123',
      manufacturer: 'Toyota',
      model: 'Corolla',
      status: 'active',
      createdAt: '2025-02-18T07:43:59.572Z',
      updatedAt: '2025-02-22T12:40:07.291Z',
    },
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  public async update(
    @Param('id') id: number,
    @Body() vehicle: VehicleUpdateDto,
  ) {
    return this.service.update(id, vehicle);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a vehicle',
    description: 'Delete an existing vehicle by its ID.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
