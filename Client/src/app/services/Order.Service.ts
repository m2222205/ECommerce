// src/app/services/order.service.ts
// This service handles UI models and conversions, calling OrderApiService

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// Import your OrderApiService
import { OrderApiService } from '../api-services/order-api.service'; // Adjust path

// Import your OrderModel and Order (Dto)
import { OrderModel } from '../models/order-model'; // Adjust path
import { Order, OrderStatus } from '../models/order'; // Adjust path (this is your OrderDto)

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private orderApiService: OrderApiService) { }

  /**
   * Fetches a preview of orders and converts them from DTOs to UI Models.
   * @returns An Observable of an array of OrderModel objects.
   */
  public getOrderPreview(): Observable<OrderModel[]> {
    return this.orderApiService.getOrderPreviewDto().pipe(
      map((orderDtos: Order[]) => orderDtos.map((dto: Order) => this.convertOrderDtoToModel(dto)))
    );
  }

  /**
   * Creates a new order by converting the UI Model to DTO, sending it,
   * and then converting the response DTO back to UI Model.
   * @param model The OrderModel object to create.
   * @returns An Observable of the created OrderModel object.
   */
  public createOrder(model: OrderModel): Observable<OrderModel> {
    const dto = this.convertOrderModelToDto(model);
    return this.orderApiService.createOrderDto(dto).pipe(
      map((responseDto: Order) => this.convertOrderDtoToModel(responseDto))
    );
  }

  /**
   * Fetches all orders and converts them from DTOs to UI Models.
   * @returns An Observable of an array of OrderModel objects.
   */
  public getAllOrders(): Observable<OrderModel[]> {
    return this.orderApiService.getAllOrdersDto().pipe(
      map((orderDtos: Order[]) => orderDtos.map((dto: Order) => this.convertOrderDtoToModel(dto)))
    );
  }

  /**
   * Converts an OrderModel (UI) to an Order (Dto for API).
   * This is where you map properties between your UI model and your API DTO.
   * @param model The OrderModel to convert.
   * @returns The converted Order DTO.
   */
  private convertOrderModelToDto(model: OrderModel): Order {
    const dto = new Order(); // Create a new instance of your Order class (Dto)
    dto.orderId = model.id;
    // For customerId, you'd need to have it available in your OrderModel or fetch it
    // dto.customerId = model.customerId; // Assuming OrderModel has customerId
    // For createdAt, you might parse from a string or use current date
    dto.createdAt = new Date(); // Or new Date(model.orderDate) if model.orderDate is a valid date string
    dto.totalAmount = model.totalDisplayAmount;
    // Map other properties as needed.
    // Example for status conversion:
    switch (model.status) {
      case 'Created': dto.status = OrderStatus.Created; break;
      case 'Processing': dto.status = OrderStatus.Processing; break;
      case 'Shipped' : dto.status = OrderStatus.Shipped; break;
      case 'Delivered' : dto.status = OrderStatus.Delivered; break;
      case 'Shipped' : dto.status = OrderStatus.Shipped; break;
      default: dto.status = OrderStatus.Pending; 
    }
    // You'll need to map products and payments if they are part of the creation payload
    // dto.orderProducts = model.products.map(p => this.convertOrderProductModelToDto(p));
    return dto;
  }

  /**
   * Converts an Order (Dto from API) to an OrderModel (UI).
   * This is where you map properties from your API DTO to your UI model.
   * @param dto The Order DTO to convert.
   * @returns The converted OrderModel.
   */
  private convertOrderDtoToModel(dto: Order): OrderModel {
    const model = new OrderModel(); // Create a new instance of your OrderModel
    model.id = dto.orderId;
    model.orderDate = dto.createdAt.toLocaleDateString(); // Format date for display
    model.totalDisplayAmount = dto.totalAmount;
    model.status = dto.status; // Direct mapping for enum string values
    // For customerName, you might need to fetch customer details or assume it's in the DTO
    // model.customerName = dto.customer?.firstName + ' ' + dto.customer?.lastName || 'N/A';
    // Map products if needed:
    // model.products = dto.orderProducts.map(op => this.convertOrderProductDtoToModel(op));
    return model;
  }

  // You would also need conversion methods for nested models like OrderProduct if they are part of the conversion chain.
  // private convertOrderProductModelToDto(model: OrderProductModel): OrderProduct { /* ... */ }
  // private convertOrderProductDtoToModel(dto: OrderProduct): OrderProductModel { /* ... */ }
}
