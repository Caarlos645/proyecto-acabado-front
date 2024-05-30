import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SessionStorageService } from './../../services/session-storage.service';
import { Category } from './../../common/category';
import { Product } from '../../common/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  username: string = '';
  email: string = '';
  categories: Category[] = [];
  products: Product[] = [];
  coincidencias: Product[] = [];
  searchQuery: string = '';

  constructor(
    private sessionStorage: SessionStorageService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('token'));
    if (this.sessionStorage.getItem('token') != null) {
      this.username = this.sessionStorage.getItem('token').username;
      this.email = this.sessionStorage.getItem('token').email;
    }
    this.listCategories();
    this.getProducts();
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      }
    );
  }

  buscar() {
    if (this.searchQuery.trim() === '') {
      this.coincidencias = [];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.coincidencias = this.products.filter(
        product => product.name.toLowerCase().startsWith(query)
      );
    }
    console.log(this.coincidencias);
  }
}
