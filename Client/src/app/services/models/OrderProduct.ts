import { OrderModel } from "./Order";
import { ProductModel } from "./Product";

export class OrderProductModel {
  orderId: number = 0; // long in C# maps to number in TypeScript
  productId: number = 0; // long in C# maps to number in TypeScript
  quantity: number = 0; // int in C# maps to number in TypeScript
  priceAtPurchase: number = 0; // decimal in C# maps to number in TypeScript
  order?: OrderModel;   // Optional, as it might be lazy-loaded or not always included
  product?: ProductModel; // Optional, as it 
}