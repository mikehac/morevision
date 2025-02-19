import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  ClientSideRowModelModule,
  GridApi,
  GridReadyEvent,
  RowSelectionOptions,
  type ColDef,
  type Module,
} from 'ag-grid-community';
import { Vehicle, VehicleService } from '../vehicle.service';
@Component({
  selector: 'app-vehicle-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ReactiveFormsModule],
  templateUrl: './vehicle-grid.component.html',
  styleUrls: ['./vehicle-grid.component.scss'],
})
export class VehicleGridComponent {
  private gridApi!: GridApi<Vehicle>;

  newVehicleForm = new FormGroup({
    id: new FormControl(''),
    licensePlate: new FormControl(''),
    manufacturer: new FormControl(''),
    model: new FormControl(''),
    status: new FormControl(''),
  });

  isModalOpen = false;
  vehicles!: Vehicle[];

  colDefs: ColDef<Vehicle>[] = [
    { field: 'id' },
    { field: 'licensePlate' },
    { field: 'manufacturer' },
    { field: 'model' },
    { field: 'status' },
    { field: 'createdAt' },
    { field: 'updatedAt' },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'singleRow',
  };

  modules: Module[] = [ClientSideRowModelModule];

  constructor(private vehicleService: VehicleService) {}

  async onGridReady(params: GridReadyEvent<Vehicle>) {
    this.gridApi = params.api;

    await this.loadVehicles();
  }

  // Load vehicles from API
  async loadVehicles() {
    (await this.vehicleService.getVehicles()).subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async createVehicle() {
    // Logic to create a new vehicle
    (await this.vehicleService.addVehicle(this.newVehicleForm.value)).subscribe(
      () => {
        this.loadVehicles();
        this.newVehicleForm.reset();

        this.closeModal();
      }
    );
  }
}
