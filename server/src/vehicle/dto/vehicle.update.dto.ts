import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class VehicleUpdateDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'License plate of the vehicle',
    example: '123-45-678',
  })
  licensePlate: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Manufacture of the vehicle',
    example: 'Toyota',
  })
  manufacturer: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Model of the vehicle',
    example: 'Corolla',
  })
  model: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Status of the vehicle',
    example: 'active',
  })
  status: 'active' | 'inactive';
}
