import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class VehicleGetDto {
  @ApiPropertyOptional({
    required: false,
    description: 'License plate of the vehicle',
    example: 'active',
  })
  @IsOptional()
  @IsIn(['all', 'active', 'inactive'])
  status?: 'all' | 'active' | 'inactive';
}
