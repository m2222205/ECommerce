
import { CartProductModel } from "./CartProduct";
import { OrderProductModel } from "./OrderProduct";

export class ProductModel {
  productId: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0; // decimal in C# maps to number in TypeScript
  stockQuantity: number = 0;
  imageLink?: string | null; // string? in C# maps to string | null | undefined in TypeScript
  isDeleted: boolean = false;
  cartProducts: CartProductModel[] = [];   // List<CartProduct> maps to CartProduct[]
  orderProducts: OrderProductModel[] = []; // List<OrderProduct> maps to OrderProduct[]
}
