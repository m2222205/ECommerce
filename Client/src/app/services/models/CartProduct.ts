import { Cart } from "../../api/interfaces/Cart.Interface";
import { CartModel } from "./Cart";
import { ProductModel } from "./Product";

export class CartProductModel {
  quantity: number = 0; // int in C# maps to number in TypeScript
  cartId: number = 0;   // long in C# maps to number in TypeScript
  cart?: Cart;         // Optional, as it might be lazy-loaded or not always included
  productId: number = 0; // long in C# maps to number in TypeScript
  product?: ProductModel;   // Optional, as 
}