import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewProduct, Product } from '../models/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${env.apiURL}products/list`);
  }

  saveProduct(product:NewProduct):Observable<Product>{
    return this.http.post<Product>(`${env.apiURL}products/save`,product);
  }

  updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(`${env.apiURL}products/update/${product.id}`,product);
  }

  deleteProduct(productId:number):Observable<any>{
    return this.http.delete<Product>(`${env.apiURL}products/delete/${productId}`);
  }
}
