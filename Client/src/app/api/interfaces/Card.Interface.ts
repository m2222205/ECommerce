import { Customer } from "./Customer.Interface";

export interface Card {
  cardId: number; 
  customerId: number;
  number: string; 
  holderName: string;
  expirationMonth: number;
  expirationYear: number;
  cvv?: number | null; 
  selectedForPayment: boolean;
  customer?: Customer; 
}