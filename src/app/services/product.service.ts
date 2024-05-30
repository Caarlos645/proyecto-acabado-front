import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = "http://localhost:8080/api/v1/admin/products";
  constructor(private httpClient: HttpClient, private headerService: HeaderService) {}

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl, {headers: this.headerService.headers});
  }

  createProduct(formData: any): Observable<any> {
    return this.httpClient.post<Product>(this.apiUrl, formData, {headers: this.headerService.headers});
  }

  deleteProductById(id: number): Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/"+id, {headers: this.headerService.headers});
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl+"/"+id, {headers: this.headerService.headers});
  }

  getProductsByCategoryId(id: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl+"/products/"+id, {headers: this.headerService.headers});
  }

  searchProduct(letter: string): Observable<any> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/name?letter=${letter}`, {headers: this.headerService.headers});
  }

}
