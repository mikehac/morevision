import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import {
  ClientSideRowModelModule,
  GridApi,
  GridReadyEvent,
  type ColDef,
  type Module,
} from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Vehicle, VehicleService } from '../vehicle.service';
@Component({
  selector: 'app-vehicle-grid',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzButtonModule,
    AgGridModule,
  ],
  templateUrl: './vehicle-grid.component.html',
  styleUrls: ['./vehicle-grid.component.scss'],
  providers: [DatePipe],
})
export class VehicleGridComponent {
  constructor(
    private vehicleService: VehicleService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private notification: NzNotificationService
  ) {}
  //TODO: move all modal popup logic to a separate component

  private gridApi!: GridApi<Vehicle>;

  filteredData: Vehicle[] = [];

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
        button.addEventListener('click', () => {
          this.updateVehiclePopup(params.data);
        });
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
        button.addEventListener('click', () => {
          this.deleteVehicle(params.data.id);
        });
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

  // Open modal popup
  openModal() {
    this.isModalOpen = true;
    this.isUpdate = false;
    this.newVehicleForm.reset();
  }

  // Close modal popup
  closeModal() {
    this.isModalOpen = false;
    this.isUpdate = false;
  }

  ifFormValid() {
    return this.newVehicleForm.valid;
  }

  onSelectionChange(status: string) {
    if (status === 'all') {
      this.filteredData = [...this.vehicles]; // Copy all data
    } else {
      this.filteredData = this.vehicles.filter(
        (vehicle) => vehicle.status === status
      );
    }
    this.loadVehicles();
  }

  handleError(error: any, context: string = 'An error occurred') {
    console.error(`${context}:`, error);
    this.notification.error(
      'Error',
      `${context}: ${error.message || 'Something went wrong'}`
    );
  }

  // Load vehicles from API
  async loadVehicles() {
    (await this.vehicleService.getVehicles(this.statusFilter)).subscribe({
      next: (data: Vehicle[]) => {
        this.vehicles = [...data];
      },
      error: (err) => this.handleError(err, 'Failed to load vehicles'),
    });
  }

  // Create a new vehicle
  async createVehicle() {
    (await this.vehicleService.addVehicle(this.newVehicleForm.value)).subscribe(
      {
        next: () => {
          this.loadVehicles();
          this.newVehicleForm.reset();
          this.closeModal();
          this.notification.success('Success', 'Vehicle successfully created');
        },
        error: (err) => this.handleError(err, 'Failed to create vehicle'),
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

  // Update vehicle's details
  async updateVehicle() {
    (
      await this.vehicleService.updateVehicle(this.newVehicleForm.value)
    ).subscribe({
      next: () => {
        this.loadVehicles();
        this.newVehicleForm.reset();

        this.closeModal();
        this.notification.success('Success', 'Vehicle successfully updated');
      },
      error: (err) => this.handleError(err, 'Failed to update vehicle'),
    });
  }

  // Delete vehicle
  async deleteVehicle(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      (await this.vehicleService.deleteVehicle(id)).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter((v) => v.id !== id);
          this.gridApi.setGridOption('rowData', [...this.vehicles]);
        },
        error: (err) => this.handleError(err, 'Failed to delete vehicle'),
      });
    }
  }
}
