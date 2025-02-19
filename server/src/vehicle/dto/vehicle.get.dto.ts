import { ApiPropertyOptional } from '@nestjs/swagger';

//TODO: Validate that status is either 'active' or 'inactive'
export class VehicleGetDto {
  @ApiPropertyOptional({
    required: false,
    description: 'License plate of the vehicle',
    example: 'active',
  })
  status?: 'active' | 'inactive';
}
