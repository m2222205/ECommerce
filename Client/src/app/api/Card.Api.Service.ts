// src/app/services/card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // Import map for data transformation

// Import your Card and Customer classes/interfaces
import { Card } from '../models/card'; // Adjust path if your models are elsewhere

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'http://localhost:7030/api'; // Ensure this matches your backend API base URL

  constructor(private http: HttpClient) { }


  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.baseUrl}/card/create`, card).pipe(
      map(cardData => new Card(cardData)) // Assuming Card is a class
    );
  }

 
  getCardsByCustomerId(customerId: number): Observable<Card[]> {
    const params = new HttpParams().set('customerId', customerId.toString());
    return this.http.get<Card[]>(`${this.baseUrl}/card/getCardsByCustomerId`, { params }).pipe(
      map(cardsData => cardsData.map(cardData => new Card(cardData))) // Assuming Card is a class
    );
  }

  
  selectCardForPayment(cardId: number): Observable<any> {
    const params = new HttpParams().set('cardId', cardId.toString());
    return this.http.put<any>(`${this.baseUrl}/card/selectCardForPaymentAsync`, null, { params });
  }

 
  deleteCard(cardId: number): Observable<void> {
    // Assuming delete expects cardId as a query parameter.
    const params = new HttpParams().set('cardId', cardId.toString());
    return this.http.delete<any>(`${this.baseUrl}/card/deleteCardAsync`, { params });
  }
}
