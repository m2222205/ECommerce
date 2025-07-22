import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'https://localhost:7030/api/';

  constructor(private http: HttpClient) {}

  createCard(data: any) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getCardsByCustomerId(customerId: string) {
    return this.http.get(`${this.baseUrl}/getCardsByCustomerId?customerId=${customerId}`);
  }

  selectCardForPayment(data: any) {
    return this.http.put(`${this.baseUrl}/selectCardForPaymentAsync`, data);
  }

  deleteCard(cardId: string) {
    return this.http.delete(`${this.baseUrl}/deleteCardAsync?cardId=${cardId}`);
  }
}
