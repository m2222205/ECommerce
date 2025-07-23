import { ProductModel } from "../../services/models/Product";
import { Cart } from "./Cart.Interface";

export interface CartProduct {
  quantity: number; 
  cartId: number;   
  cart?: Cart;        
  productId: number;
  product?: ProductModel;  
}