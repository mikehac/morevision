import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'vehicledb',
      entities: [Vehicle],
      synchronize: true,
    }),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
