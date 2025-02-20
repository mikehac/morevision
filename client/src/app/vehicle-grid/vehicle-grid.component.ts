import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import {
  ClientSideRowModelModule,
  GridApi,
  GridReadyEvent,
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
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef
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
  isUpdate = false;

  vehicles!: Vehicle[];

  statusFilter: 'all' | 'active' | 'inactive' | undefined = 'all';
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
    {
      headerName: 'Update',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Update';
        button.classList.add('btn', 'btn-primary');
        button.addEventListener('click', () =>
          this.updateVehiclePopup(params.data)
        );
        return button;
      },
      width: 100,
    },
    {
      headerName: 'Delete',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.classList.add('btn', 'btn-danger');
        button.addEventListener('click', () =>
          this.deleteVehicle(params.data.id)
        );
        return button;
      },
      width: 100,
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    // minWidth: 100,
    cellStyle: { textAlign: 'left' },
  };

  modules: Module[] = [ClientSideRowModelModule];

  async onGridReady(params: GridReadyEvent<Vehicle>) {
    this.gridApi = params.api;

    await this.loadVehicles();
  }

  // Load vehicles from API
  async loadVehicles() {
    (await this.vehicleService.getVehicles(this.statusFilter)).subscribe(
      (data: Vehicle[]) => {
        this.vehicles = [...data];
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
    this.isUpdate = false;
    this.newVehicleForm.reset();
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

  updateVehiclePopup(vehicle: Vehicle) {
    this.isUpdate = true;
    this.isModalOpen = true;
    this.cdRef.detectChanges();

    this.newVehicleForm.setValue({
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      status: vehicle.status,
    });
  }

  async updateVehicle() {
    (
      await this.vehicleService.updateVehicle(this.newVehicleForm.value)
    ).subscribe(() => {
      this.loadVehicles();
      this.newVehicleForm.reset();

      this.closeModal();
    });
  }

  async deleteVehicle(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      (await this.vehicleService.deleteVehicle(id)).subscribe(() => {
        this.vehicles = this.vehicles.filter((v) => v.id !== id);
        this.gridApi.setGridOption('rowData', [...this.vehicles]);
      });
    }
  }

  onSelectionChange(event: any) {
    console.log(event.target.value);
    this.statusFilter = event.target.value;
    this.loadVehicles();
  }
}
