import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto:any):Observable<any>{
    return this.http.post(BASIC_URL + "/api/admin/car", carDto, {
      headers: this.createAutorizationHeader()
    })
  }

  getAllCars():Observable<any>{
    return this.http.get(BASIC_URL+"/api/admin/cars", {
      headers: this.createAutorizationHeader()
    })
  }

  deleteCar(id: number):Observable<any>{
    return this.http.delete(BASIC_URL + "/api/admin/car/" + id,{
      headers: this.createAutorizationHeader()
    });
  }

  getCarById(id: number):Observable<any>{
    return this.http.get(BASIC_URL + "/api/admin/car/" + id, {
      headers:this.createAutorizationHeader()
    });
  }

  updateCar(carId: Number, carDto: any):Observable<any>{
    return this.http.put(BASIC_URL + "/api/admin/car/" + carId, carDto,{
      headers: this.createAutorizationHeader()
    });
  }
  getCarBookings():Observable<any>{
    return this.http.get(BASIC_URL+"/api/admin/car/bookings", {
      headers: this.createAutorizationHeader()
    });
  }

  changeBookingStatus(bookingId:number, status:string): Observable<any>{
    return this.http.get(`${BASIC_URL}/api/admin/car/booking/${bookingId}/${status}`, {
      headers: this.createAutorizationHeader()
    });    
  }


  createAutorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Autorization', 'Bearer ' + StorageService.getToken()
    );
  }
}
