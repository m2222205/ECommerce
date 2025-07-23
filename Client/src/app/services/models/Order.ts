import {  CustomerModel } from "./Customer";
import {  OrderProductModel } from "./OrderProduct";
import {  PaymentModel } from "./Payment";

export enum OrderStatus {
  Pending = 'Created',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  // Add other statuses as needed
}

export class OrderModel {
  orderId: number = 0; // long in C# maps to number in TypeScript
  customerId: number = 0;
  createdAt: Date = new Date(); // DateTime in C# maps to Date in TypeScript
  totalAmount: number = 0; // decimal in C# maps to number in TypeScript
  discount: number = 0;
  discountPercentage: number = 0; // byte in C# maps to number in TypeScript
  servicePrice: number = 0;
  customer?: CustomerModel; // Optional, as it might be lazy-loaded or not always included
  status: OrderStatus = OrderStatus.Pending; // Using the defined OrderStatus enum
  orderProducts: OrderProductModel[] = []; // List<OrderProduct> in C# maps to OrderProduct[]
  payments: PaymentModel[] = []; // List<Payment> in C# maps to Payment[]
}
