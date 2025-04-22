import { Component, effect, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';
import { FormComponent } from "../form/form.component";
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../../data/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    MatButtonModule, MatSelectModule, FormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  products = this.productsService.productsList();
  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stock', 'status'];
  dataSource = new MatTableDataSource<Product>(this.products);
  clickedRow: Product | null = null;
  categories = ['Electronics', 'Apparel', 'Furniture'];
  statusOpt = ['available', 'out-of-stock', 'archived']
  
  nameInput = new FormControl<string>(this.clickedRow?.name ?? '');
  descriptionInput = new FormControl<string>(this.clickedRow?.description ?? '');
  priceInput = new FormControl(this.clickedRow?.price);
  stockInput = new FormControl(this.clickedRow?.stock);

  productsEffect = effect(() => {
    console.log(this.productsService.productsList());
    this.products = this.productsService.productsList();
    this.dataSource = new MatTableDataSource<Product>(this.products);
  })

  onSelectChange<K extends keyof Product>(param: K, event: MatSelectChange){
    if(this.clickedRow && param in this.clickedRow){
      this.clickedRow[param] = event.value ?? this.clickedRow[param]
      this.productsService.updateProduct(this.clickedRow);
    }
  }

  onInputChange<K extends keyof Product>(param: K, value: Product[K]){
    if(this.clickedRow && param in this.clickedRow){
      this.clickedRow[param] = value ?? this.clickedRow[param]
      this.productsService.updateProduct(this.clickedRow);
    }
  }
  editClickedRow(row: Product){
    this.clickedRow = row;
    this.nameInput.setValue(this.clickedRow?.name);
    this.descriptionInput.setValue(this.clickedRow?.description);
    this.priceInput.setValue(this.clickedRow?.price);
  }

  deleteUser(){
    if(this.clickedRow)
      this.productsService.deleteProduct(this.clickedRow);
  }

  addProduct() {
    const newProduct: Product = {
      id: this.products.length+1,
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      status: '',
      rating: 0,
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    // Set the new row as the clickedRow to enable inline editing
    this.editClickedRow(newProduct);
    this.productsService.addProduct(newProduct);
  
    // Add the new row to the beginning of the data array
    this.dataSource.data = [newProduct, ...this.dataSource.data];
  }

  constructor(private productsService: ProductsService){
  }
}

