import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: any;
  filterCategory: any;
  categories: string[] = [];

  searchKey: string = '';
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  filterByCategory(event: any) {
    let value = event.target.value;
    value == 'all' ? this.getProducts() : this.getProductsCategory(value);
  }
  getProductsCategory(keyword: string) {
    this.api.getProductsByCategory(keyword).subscribe((res: any) => {
      this.productList = res;
    });
  }

  getCategories() {
    this.api.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error) => {
        alert(error);
      }
    );
  }

  getProducts() {
    this.api.getAllProducts().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        console.log(a.category);
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
