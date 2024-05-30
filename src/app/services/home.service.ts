import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl: string = "https://proyecto-final-ecommerce-production.up.railway.app/api/v1/home";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl+"/"+id);
  }
}
