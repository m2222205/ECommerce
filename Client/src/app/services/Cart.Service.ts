// src/app/services/cart.service.ts
// This service handles UI models and conversions, calling CartApiService

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// Import your CartApiService
import { CartApiService } from '../api-services/cart-api.service'; // Adjust path

// Import your CartModel and Cart (Dto)
import { CartModel } from '../models/cart-model'; // Adjust path
import { Cart } from '../models/cart'; // Adjust path (this is your CartDto)
import { CartProduct } from '../models/cart-product'; // Adjust path (CartProduct DTO)
import { CartProductModel } from '../models/cart-product-model'; // Adjust path (CartProduct UI Model)
import { Product } from '../models/product'; // Import Product DTO for conversion logic
import { ProductModel } from '../models/product-model'; // Import ProductModel for conversion logic

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private cartApiService: CartApiService) { }

  /**
   * Adds a product to a cart by converting the UI Model to DTO, sending it,
   * and then converting the response DTO back to UI Model.
   * @param cartId The ID of the cart to add the product to.
   * @param productId The ID of the product to add.
   * @param quantity The quantity of the product to add.
   * @returns An Observable of the updated CartModel object.
   */
  public addProductToCart(cartId: number, productId: number, quantity: number): Observable<CartModel> {
    // No direct model-to-dto conversion for input parameters here,
    // as they are primitive types (numbers).
    return this.cartApiService.addProductToCartDto(cartId, productId, quantity).pipe(
      map((responseDto: Cart) => this.convertCartDtoToModel(responseDto))
    );
  }

  /**
   * Fetches a cart by ID and converts it from DTO to UI Model.
   * @param cartId The ID of the cart to fetch.
   * @returns An Observable of a single CartModel object.
   */
  public getCart(cartId: number): Observable<CartModel> {
    return this.cartApiService.getCartDto(cartId).pipe(
      map((dto: Cart) => this.convertCartDtoToModel(dto))
    );
  }

  /**
   * Converts a CartModel (UI) to a Cart (Dto for API).
   * This is where you map properties between your UI model and your API DTO.
   * @param model The CartModel to convert.
   * @returns The converted Cart DTO.
   */
  private convertCartModelToDto(model: CartModel): Cart {
    const dto = new Cart(); // Create a new instance of your Cart class (Dto)
    dto.cartId = model.id;
    dto.customerId = model.customerId;
    // createdAt will likely be set by the backend on creation, or you might send a current date
    dto.createdAt = new Date();
    // For cartProducts, you'll need to convert each CartProductModel to CartProduct DTO
    dto.cartProducts = model.cartProducts.map(cpModel => this.convertCartProductModelToDto(cpModel));
    // Customer object might not be sent on creation/update, only customerId
    // dto.customer = this.convertCustomerModelToDto(model.customer); // If you have a CustomerModel

    return dto;
  }

  /**
   * Converts a Cart (Dto from API) to a CartModel (UI).
   * This is where you map properties from your API DTO to your UI model.
   * @param dto The Cart DTO to convert.
   * @returns The converted CartModel.
   */
  private convertCartDtoToModel(dto: Cart): CartModel {
    const model = new CartModel(); // Create a new instance of your CartModel
    model.id = dto.cartId;
    model.customerId = dto.customerId;
    model.createdAtDisplay = dto.createdAt.toLocaleDateString(); // Format date for display
    model.totalItems = dto.cartProducts.reduce((sum, cp) => sum + cp.quantity, 0); // Calculate total items
    // For customerName, you might need to fetch customer details or assume it's in the DTO
    // model.customerName = dto.customer?.firstName + ' ' + dto.customer?.lastName || 'N/A';
    // Convert nested cart products DTOs to UI models
    model.cartProducts = dto.cartProducts.map(cpDto => this.convertCartProductDtoToModel(cpDto));

    return model;
  }

  /**
   * Converts a CartProductModel (UI) to a CartProduct (Dto for API).
   * @param model The CartProductModel to convert.
   * @returns The converted CartProduct DTO.
   */
  private convertCartProductModelToDto(model: CartProductModel): CartProduct {
    const dto = new CartProduct();
    dto.productId = model.productId;
    dto.quantity = model.quantity;
    // You might need to set cartId here if it's not handled by the parent Cart conversion
    // dto.cartId = model.cartId;
    // Product details might not be sent back to backend for CartProduct DTO
    return dto;
  }

  /**
   * Converts a CartProduct (Dto from API) to a CartProductModel (UI).
   * @param dto The CartProduct DTO to convert.
   * @returns The converted CartProductModel.
   */
  private convertCartProductDtoToModel(dto: CartProduct): CartProductModel {
    const model = new CartProductModel();
    model.productId = dto.productId;
    model.quantity = dto.quantity;
    model.price = dto.priceAtPurchase || 0; // Assuming priceAtPurchase is on CartProduct DTO
    model.totalLinePrice = model.quantity * model.price;
    // You'll likely need to fetch product details (name, etc.) separately or include them in the CartProduct DTO
    model.productName = dto.product?.name || 'Unknown Product'; // Assuming dto.product is available
    return model;
  }
}
