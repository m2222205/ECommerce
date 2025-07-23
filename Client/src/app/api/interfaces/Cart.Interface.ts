import { CartProductModel } from "../../services/models/CartProduct";
import { Customer } from "./Customer.Interface";

export interface Cart {
  cartId: number; 
  customerId: number;
  createdAt: Date; 
  customer?: Customer; 
  cartProducts: CartProductModel[];
}