import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  urlProduct: string = 'https://fakestoreapi.com/products';
  urlCategories: string = 'https://fakestoreapi.com/products/categories';
  urlProductByCategory: string = 'https://fakestoreapi.com/products/category';

  getAllProducts() {
    return this.http.get(this.urlProduct);
  }

  getAllCategories() {
    return this.http.get(this.urlCategories);
  }
  getProductsByCategory(keyword: string) {
    return this.http.get(this.urlProductByCategory + '/' + keyword);
  }

  getProductById(id: any) {
    return this.http.get(this.urlProduct + '/' + id);
  }
}
