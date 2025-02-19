import { CommonModule, DatePipe } from '@angular/common';
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
  providers: [DatePipe],
})
export class VehicleGridComponent {
  constructor(
    private vehicleService: VehicleService,
    private datePipe: DatePipe
  ) {}

  private gridApi!: GridApi<Vehicle>;

  newVehicleForm = new FormGroup({
    id: new FormControl(0),
    licensePlate: new FormControl(''),
    manufacturer: new FormControl(''),
    model: new FormControl(''),
    status: new FormControl(''),
  });

  isModalOpen = false;
  vehicles!: Vehicle[];

  colDefs: ColDef<Vehicle>[] = [
    { field: 'id', width: 10, minWidth: 10 },
    { field: 'licensePlate' },
    { field: 'manufacturer' },
    { field: 'model' },
    { field: 'status' },
    {
      field: 'createdAt',
      valueFormatter: (params) =>
        params.value
          ? this.datePipe.transform(params.value, 'dd/MM/yyyy') || ''
          : '',
    },
    {
      field: 'updatedAt',
      valueFormatter: (params) =>
        params.value
          ? this.datePipe.transform(params.value, 'dd/MM/yyyy') || ''
          : '',
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    // minWidth: 100,
    cellStyle: { textAlign: 'left' }, // Align text to the left
  };

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'singleRow',
  };

  modules: Module[] = [ClientSideRowModelModule];

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
