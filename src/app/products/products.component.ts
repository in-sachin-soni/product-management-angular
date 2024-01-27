import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NewProduct, Product } from '../models/product';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productForm = new FormGroup({
    id:new FormControl(0),
    name: new FormControl('', [Validators.required, validName]),
    price: new FormControl('', Validators.required)
  });

  productList:Product[] = [];

  constructor(private productService:ProductService){
    this.getAllProducts();
  };

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.productList = data;
    });
  }

  saveProduct(){
    if(this.productForm.value.id == 0 || this.productForm.value.id == null){
      const product:NewProduct = {
        name: this.productForm.value.name || '',
        price:this.productForm.value.price || ''
      };
      
      this.productService.saveProduct(product).subscribe(result=>{
        this.productForm.reset();
        this.getAllProducts();
      });
    }else{
      const product:Product = {
        id:this.productForm.value.id,
        name: this.productForm.value.name || '',
        price:this.productForm.value.price || ''
      };
      
      this.productService.updateProduct(product).subscribe(result=>{
        this.productForm.reset();
        this.getAllProducts();
      });
    }
  }

  editProduct(product:Product){
    this.productForm.setValue({
      id:product.id,
      name:product.name,
      price:product.price
    });
  }

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId).subscribe(result=>{
      this.productForm.reset();
      this.getAllProducts();
    });
  }
}

export function validName(control: AbstractControl){
  const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (control.value && nameRegexp.test(control.value)) {
    return { validName: false };
  }
  return null;  
}