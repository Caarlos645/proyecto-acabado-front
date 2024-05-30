import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, HeaderAdminComponent, RouterModule, FooterComponent]
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];

  constructor(private ProductService: ProductService) {

  }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.ProductService.getProducts().subscribe(
      data => this.products = data
    );
  }

  deleteProductById(id: number) {
    Swal.fire({
      title: "¿Está seguro que quiere eliminar este registro?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar.",
      cancelButtonText: "Cancelar.",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductService.deleteProductById(id).subscribe(
          ()=> this.listProducts()
        );
        Swal.fire({
          title: "Eliminado",
          text: "Producto eliminado correctamente.",
          icon: "success"
        });
      }
    });

  }

}
