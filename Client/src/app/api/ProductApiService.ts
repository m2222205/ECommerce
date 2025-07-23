// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 


import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:7030/api';

  constructor(private http: HttpClient) { }

   
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product/getAll`);
  }

  
  getProductById(productId: number): Observable<Product> {
    const params = new HttpParams().set('id', productId.toString());
    return this.http.get<Product>(`${this.baseUrl}/product/get`, { params });
  }

 
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product/create`, product);
  }

  
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/product/update`, product);
  }

 
  deleteProduct(productId: number): Observable<any> {
    const params = new HttpParams().set('id', productId.toString());
    return this.http.delete<any>(`${this.baseUrl}/product/delete`, { params });
  }
}