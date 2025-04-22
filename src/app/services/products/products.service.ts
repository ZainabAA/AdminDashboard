import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../../data/products';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList = signal(PRODUCTS);

  addProduct(productItem: Product){
    this.productsList.update(current => [...current, productItem]);
    this.toastService.add("product added", "success");
  }

  deleteProduct(product: Product){
    this.productsList.update(current => [...current.filter(prod => prod != product)])
    this.toastService.add("product deleted", "success");
  }

  updateProduct(productItem: Product){
    
    this.productsList.update(current => {
      return current.map(prod => {
        if(prod.id === productItem.id)
          return productItem
        return prod
      })
    })
    this.toastService.add("product updated", "success");
  }
  constructor(private toastService: ToastService) { }
}
