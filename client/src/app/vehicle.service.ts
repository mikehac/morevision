import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getVehicles(status: 'all' | 'active' | 'inactive' = 'all') {
    const params = new HttpParams().set('status', status);
    return await this.http.get<Vehicle[]>(this.baseUrl, { params });
  }
  async deleteVehicle(id: any) {
    return await this.http.delete(`${this.baseUrl}/${id}`);
  }
  async updateVehicle(vehicle: any) {
    return await this.http.patch(`${this.baseUrl}/${vehicle.id}`, vehicle);
  }
  async addVehicle(vehicle: any) {
    return await this.http.post(this.baseUrl, vehicle);
  }
}

export interface Vehicle {
  id: number;
  licensePlate: string;
  manufacturer: string;
  model: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
