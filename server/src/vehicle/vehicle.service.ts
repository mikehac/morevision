import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleCreateDto } from './dto/vehicle.create.dto';
import { VehicleUpdateDto } from './dto/vehicle.update.dto';
import { Logger } from '@nestjs/common';
import { VehicleGetDto } from './dto/vehicle.get.dto';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  public async create(vehicle: VehicleCreateDto) {
    try {
      const newVehicle = {
        ...vehicle,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return await this.repo.save(newVehicle);
    } catch (error) {
      this.logger.error(
        `Failed to create new vehicle ${JSON.stringify(vehicle)}`,
        error.message,
        error.stack,
      );
      throw error;
    }
  }

  public async update(id: number, vehicle: VehicleUpdateDto) {
    try {
      const vehicleToUpdate = await this.repo.findOneBy({ id });
      if (!vehicleToUpdate) {
        throw new NotFoundException(`Vehicle with id=${id} not found`);
      }
      const updatedVehicle = {
        ...vehicle,
        updatedAt: new Date(),
      };
      await this.repo.update(id, updatedVehicle);
      return await this.repo.findOneBy({ id });
    } catch (error) {
      this.logger.error(
        `Failed to update vehicle with id=${id}`,
        error.message,
        error.stack,
      );
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const vehicleToDelete = await this.repo.findOneBy({ id });
      if (!vehicleToDelete) {
        throw new NotFoundException(`Vehicle with id=${id} not found`);
      }
      await this.repo.delete(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete vehicle with id=${id}`,
        error.message,
        error.stack,
      );
      throw error;
    }
  }

  public async findAll({ status }: VehicleGetDto) {
    try {
      if (status === 'active' || status === 'inactive') {
        return await this.repo
          .createQueryBuilder()
          .select()
          .where('status = :status', { status })
          .getMany();
      }

      return await this.repo.find();
    } catch (error) {
      this.logger.error(
        'Failed to retrieve vehicles',
        error.message,
        error.stack,
      );
      throw error;
    }
  }
}
