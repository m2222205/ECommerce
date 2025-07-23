// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; 


import { Order } from '../models/Order'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:7030/api'; 

  constructor(private http: HttpClient) { }

 
  getOrderPreview(): Observable<Order[]> { 
    return this.http.get<Order[]>(`${this.baseUrl}/order/getPreview`).pipe(
      map(ordersData => ordersData.map(orderData => new Order(orderData)))
    );
  }

 
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/order/create`, order).pipe(
      map(orderData => new Order(orderData)) 
    );
  }

  
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/order/getAll`).pipe(
      map(ordersData => ordersData.map(orderData => new Order(orderData))) 
    );
  }

 
}
