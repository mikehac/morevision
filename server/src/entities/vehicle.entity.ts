import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  status: 'active' | 'inactive';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
