import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList = signal(PRODUCTS);

  addProduct(productItem: Product){
    this.productsList.update(current => [...current, productItem]);
  }

  deleteProduct(id: number){
    this.productsList.update(current => [...current.filter(prod => prod.id === id)])
  }

  updateProduct(productItem: Product){
    
    this.productsList.update(current => {
      return current.map(prod => {
        if(prod.id === productItem.id)
          return productItem
        return prod
      })
    })
  }
  constructor() { }
}
