import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from './Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  insert(data: Vehicle): Observable<any> {

    console.log(data);
    return this.http.post("http://localhost:8003/ftr/vehicles",data,{responseType:'text' as 'json'});
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>("http://localhost:8003/ftr/vehicles");
  }
  getByName(data: Vehicle): Observable<Vehicle[]> {
    let link = "http://localhost:8003/ftr/vehicles/managed-name/"+data.vehicleName;
    return this.http.get<Vehicle[]>(link);
  }
  getByNum(data: Vehicle): Observable<Vehicle> {
    let link = "http://localhost:8003/ftr/vehicles/managed-number/"+data.vehicleNumber;
    return this.http.get<Vehicle>(link);
  }
  delete(data: Vehicle): Observable<string> {
    let link = "http://localhost:8003/ftr/vehicles/"+data.vehicleNumber;
    console.log(link);
    return this.http.delete<string>(link,{responseType:'text' as 'json'});
  }
}
