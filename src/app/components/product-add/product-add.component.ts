import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { FooterComponent } from "../footer/footer.component"; // Importa tu servicio de Firebase

@Component({
    selector: 'app-product-add',
    standalone: true,
    templateUrl: './product-add.component.html',
    styleUrl: './product-add.component.css',
    imports: [
        HeaderAdminComponent,
        RouterModule,
        FormsModule,
        ToastrModule,
        CommonModule,
        FooterComponent
    ]
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  code: string = "001";
  name: string = "";
  description: string = "";
  precio: number = 0;
  urlImage: string = "";
  userId: string = "0";
  categoryId: string = "1";
  user: number = 0;
  selectFile!: File;
  categories: Category[] = [];

  constructor(
    private ProductService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private sessionStorage: SessionStorageService,
    private firebaseService: FirebaseServiceService // Inyecta el servicio de Firebase
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProductById();
    this.user = this.sessionStorage.getItem('token').id;
    this.userId = this.user.toString();
  }

  async addProduct() {
    try {
      // Primero sube la imagen a Firebase
      if (this.selectFile) {
        this.urlImage = await this.firebaseService.uploadFile(this.name, this.selectFile);

      }

      const form = new FormData();
      form.append("id", this.id.toString());
      form.append("code", this.code);
      form.append("name", this.name);
      form.append("description", this.description);
      form.append("precio", this.precio.toString());
      form.append("urlImage", this.urlImage);
      form.append("userId", this.userId);
      form.append("categoryId", this.categoryId);

      this.ProductService.createProduct(form).subscribe(
        data => {
          console.log(data);
          if (this.id == 0) {
            this.toastr.success('Producto registrado correctamente.', 'Productos');
          } else {
            this.toastr.success('Producto actualizado correctamente.', 'Productos');
          }
          this.router.navigate(["admin/product"]);
        }
      );
    } catch (error) {
      this.toastr.error('Error al subir la imagen o crear el producto.', 'Error');
      console.error(error);
    }
  }

  getProductById() {
    this.activatedRoute.params.subscribe(
      product => {
        let id = product["id"];
        if (id) {
          this.ProductService.getProductById(id).subscribe(
            data => {
              this.id = data.id;
              this.code = data.code;
              this.name = data.name;
              this.description = data.description;
              this.precio = data.precio;
              this.urlImage = data.urlImage;
              this.userId = data.userId.toString();
              this.categoryId = data.categoryId.toString();
            }
          );
        }
      }
    );
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0];
  }

  getCategories() {
    return this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    );
  }
}
