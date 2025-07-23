import { OrderStatus } from "../../services/models/Order";
import {  OrderProductModel } from "../../services/models/OrderProduct";
import {  PaymentModel } from "../../services/models/Payment";
import { Customer } from "./Customer.Interface";




export interface Order {
  orderId: number; 
  customerId: number;
  createdAt: Date; 
  totalAmount: number; 
  discount: number;
  discountPercentage: number; 
  servicePrice: number;
  customer?: Customer; 
  status: OrderStatus; 
  orderProducts: OrderProductModel[]; 
  payments: PaymentModel[]; 
}
