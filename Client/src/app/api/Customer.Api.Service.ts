// src/app/services/customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // Import map for data transformation

// Import your Customer class/interface
import { Customer } from '../models/Customer'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:7030/api'; 

  constructor(private http: HttpClient) { }

  
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customer/create`, customer).pipe(
      map(customerData => new Customer(customerData)) 
    );
  }

 
  getCustomerById(customerId: number): Observable<Customer> {
    const params = new HttpParams().set('id', customerId.toString());
    return this.http.get<Customer>(`${this.baseUrl}/customer/getById`, { params }).pipe(
      map(customerData => new Customer(customerData)) 
    );
  }

  
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customer/getAll`).pipe(
      map(customersData => customersData.map(customerData => new Customer(customerData))) 
    );
  }

 
  deleteCustomer(customerId: number): Observable<void> {   
    const params = new HttpParams().set('id', customerId.toString());
    return this.http.delete<void>(`${this.baseUrl}/customer/delete`, { params });
  }
}
