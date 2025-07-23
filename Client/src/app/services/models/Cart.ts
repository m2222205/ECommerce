import { CartProduct } from "../../api/interfaces/CartProduct.Interface";
import { CartProductModel } from "./CartProduct";
import { CustomerModel } from "./Customer";

export class CartModel {
  cartId: number = 0;
  customerId: number = 0;
  createdAt: Date = new Date(); 
  customer?: CustomerModel; 
  cartProducts: CartProduct[] = []; 
}
