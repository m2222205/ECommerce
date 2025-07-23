import { PaymentMethod, PaymentStatus } from "../../services/models/Payment";
import { Order } from "./Order.Interface";

export interface Payment {
  paymentId: number; 
  paymentMethod: PaymentMethod ; 
  paymentStatus: PaymentStatus;
  paidAmount: number; 
  paidAt: Date; 
  orderId: number; 
  order?: Order; 
}