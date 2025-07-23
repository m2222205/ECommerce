import { CardModel } from "../../services/models/Card";
import { CartModel } from "../../services/models/Cart";
import { UserRole } from "../../services/models/Customer";
import { OrderModel } from "../../services/models/Order";

export interface Customer {  
  customerId: number; 
  firstName: string; 
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole; 
  cart: CartModel; 
  orders: OrderModel[]; 
  cards: CardModel[];   
}