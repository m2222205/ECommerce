import { Card } from "../../api/interfaces/Card.Interface";
import { Cart } from "../../api/interfaces/Cart.Interface";
import { CardModel } from "./Card";
import { CartModel } from "./Cart";
import { OrderModel } from "./Order";

export enum UserRole {
  Seller = 'Seller',
  Buyer = 'Buyer',
  Admin = 'Admin',
}




export class CustomerModel {
  
  customerId: number = 0; 
  firstName: string = ''; 
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  role: UserRole = UserRole.Admin; // Initialize with a default enum value
  cart: Cart = cart; // This might still error if Cart isn't optional or initialized
  orders: OrderModel[] = []; // Initialize with an empty array
  cards: Card[] = [];   // Initialize with an empty arra
}