import { ProductModel } from "../../services/models/Product";
import { Order } from "./Order.Interface";

export interface OrderProduct {
  orderId: number; 
  productId: number; 
  quantity: number; 
  priceAtPurchase: number; 
  order?: Order;
  product?: ProductModel; 
}