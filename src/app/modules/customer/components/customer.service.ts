import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
const BASIC_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCars(): Observable<any> 
  {
    return this.http.get(BASIC_URL + "/api/customer/cars", {
    headers: this.createAutorizationHeader()
  })
  }

  getCarById(CarId: number): Observable<any> 
  {
    return this.http.get(BASIC_URL + "/api/customer/car/" + CarId, {
    headers: this.createAutorizationHeader()
  })
  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/book", bookACarDto, {
      headers: this.createAutorizationHeader()
    });
  }
  
  getBookingByUserId(): Observable<any> 
  {
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/" + StorageService.getUserId(), {
    headers: this.createAutorizationHeader()
  })
  }

  createAutorizationHeader(): HttpHeaders
  {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Autorization', 'Bearer ' + StorageService.getToken()
    );
  }

}
