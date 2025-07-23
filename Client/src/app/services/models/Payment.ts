import { OrderModel } from "./Order";

export enum PaymentMethod {
  Click = 'Click',
  PayPal = 'PayPal',
  Payme = 'Payme',
  Uzum = 'Uzum',
  CashPayment = 'CashPayment'
}

export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Refunded = 'Refunded',
  
}

// --- CLASS DEFINITION ---

export class PaymentModel {
  paymentId: number = 0; // long in C# maps to number in TypeScript
  paymentMethod: PaymentMethod = PaymentMethod.Click; // Default to a specific method
  paymentStatus: PaymentStatus = PaymentStatus.Pending; // Default to Pending
  paidAmount: number = 0; // decimal in C# maps to number in TypeScript
  paidAt: Date = new Date(); // DateTime in C# maps to Date in TypeScript
  orderId: number = 0; // long in C# maps to number in TypeScript
  order?: OrderModel; // Optional, as it might be lazy-loaded or not always included}
}
