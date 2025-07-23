import {CustomerModel } from "./Customer";

export class CardModel {
  cardId: number = 0; // long in C# maps to number in TypeScript
  customerId: number = 0;
  number: string = ''; // 'Number' is a reserved keyword in JavaScript/TypeScript, so use 'number' (lowercase)
  holderName: string = '';
  expirationMonth: number = 0;
  expirationYear: number = 0;
  cvv?: number | null; // int? in C# maps to number | null | undefined in TypeScript
  selectedForPayment: boolean = false;
  customer?: CustomerModel; 
}
