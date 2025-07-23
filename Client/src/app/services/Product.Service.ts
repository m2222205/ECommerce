// src/app/services/product.service.ts
// This service handles UI models and conversions, calling ProductApiService

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// Import your ProductApiService
import { ProductApiService } from '../api/ProductApiService'; // Adjust path

// Import your ProductModel and Product (Dto)
import { ProductModel } from '../models/product-model'; // Adjust path
import { Product } from '../models/product'; // Adjust path (this is your ProductDto)

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productApiService: Product.Api.Service) { }

  /**
   * Fetches all products and converts them from DTOs to UI Models.
   * @returns An Observable of an array of ProductModel objects.
   */
  public getAllProducts(): Observable<ProductModel[]> {
    return this.productApiService.getAllProductsDto().pipe(
      map((productDtos: Product[]) => productDtos.map((dto: Product) => this.convertProductDtoToModel(dto)))
    );
  }

  /**
   * Fetches a single product by ID and converts it from DTO to UI Model.
   * @param productId The ID of the product to fetch.
   * @returns An Observable of a single ProductModel object.
   */
  public getProductById(productId: number): Observable<ProductModel> {
    return this.productApiService.getProductByIdDto(productId).pipe(
      map((dto: Product) => this.convertProductDtoToModel(dto))
    );
  }

  /**
   * Creates a new product by converting the UI Model to DTO, sending it,
   * and then converting the response DTO back to UI Model.
   * @param model The ProductModel object to create.
   * @returns An Observable of the created ProductModel object.
   */
  public createProduct(model: ProductModel): Observable<ProductModel> {
    const dto = this.convertProductModelToDto(model);
    return this.productApiService.createProductDto(dto).pipe(
      map((responseDto: Product) => this.convertProductDtoToModel(responseDto))
    );
  }

 
  public updateProduct(model: ProductModel): Observable<ProductModel> {
    const dto = this.convertProductModelToDto(model);
    return this.productApiService.updateProductDto(dto).pipe(
      map((responseDto: Product) => this.convertProductDtoToModel(responseDto))
    );
  }

 
  public deleteProduct(productId: number): Observable<void> {
    return this.productApiService.deleteProductDto(productId);
  }

  
  private convertProductModelToDto(model: ProductModel): Product {
    const dto = new Product(); 
    dto.productId = model.id;
    dto.name = model.productName;
    dto.price = model.displayPrice; 
    dto.stockQuantity = model.inStock ? 1 : 0; 
    
    return dto;
  }

  
  private convertProductDtoToModel(dto: Product): ProductModel {
    const model = new ProductModel(); // Create a new instance of your ProductModel
    model.id = dto.productId;
    model.productName = dto.name;
    model.displayPrice = dto.price;
    model.inStock = dto.stockQuantity > 0; // Example: simple mapping for stock
    // Map other properties as needed based on your ProductModel and Product DTO structure
    // Example: model.description = dto.description;
    // Example: model.imageUrl = dto.imageLink;
    return model;
  }
}
