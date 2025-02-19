import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getVehicles() {
    return await this.http.get<Vehicle[]>(this.baseUrl);
  }
  async deleteVehicle(id: any) {
    console.log('deleteVehicle', id);
  }
  async updateVehicle(vehicle: any) {
    console.log('updateVehicle', vehicle);
  }
  async addVehicle(vehicle: any) {
    return await this.http.post(this.baseUrl, vehicle);
  }
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  manufacturer: string;
  model: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
