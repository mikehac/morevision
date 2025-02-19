import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
export class VehicleCreateDto {
  @IsString()
  @ApiProperty({
    description: 'License plate of the vehicle',
    example: '123-45-678',
  })
  licensePlate: string;

  @IsString()
  @ApiProperty({
    description: 'Manufacture of the vehicle',
    example: 'Toyota',
  })
  manufacturer: string;

  @IsString()
  @ApiProperty({ description: 'Model of the vehicle', example: 'Corolla' })
  model: string;

  @IsString()
  @ApiProperty({ description: 'Status of the vehicle', example: 'active' })
  status: 'active' | 'inactive';
}
