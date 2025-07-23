import { CartProduct } from "./CartProduct.Interface";
import { OrderProduct } from "./OrderProduct.Interface";

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number; 
  stockQuantity: number;
  imageLink?: string | null; 
  isDeleted: boolean;
  cartProducts: CartProduct[];   
  orderProducts: OrderProduct[]; 
}