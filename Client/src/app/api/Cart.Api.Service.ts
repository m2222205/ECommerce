// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // Import map for data transformation

// Import your Cart and CartProduct classes/interfaces
import { Cart } from '../models/cart'; // Adjust path if your models are elsewhere
import { CartProduct } from '../models/cart-product'; // Adjust path if your models are elsewhere

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:7030/api';

  constructor(private http: HttpClient) { }

  
  addProductToCart(cartId: number, productId: number, quantity: number): Observable<Cart> {
   
    const payload = { cartId, productId, quantity };
    return this.http.post<Cart>(`${this.baseUrl}/cart/addProduct`, payload).pipe(
      map(cartData => new Cart(cartData)) // Assuming Cart is a class
    );
  }

  
  getCart(cartId: number): Observable<Cart> {
  
    const params = new HttpParams().set('id', cartId.toString());
    return this.http.get<Cart>(`${this.baseUrl}/cart/get`, { params }).pipe(
      map(cartData => new Cart(cartData)) // Assuming Cart is a class
    );
  }


}
