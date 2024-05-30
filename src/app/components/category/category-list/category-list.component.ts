import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { HeaderAdminComponent } from '../../header-admin/header-admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-category-list',
    standalone: true,
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css',
    imports: [
        HeaderAdminComponent,
        CommonModule,
        RouterModule,
        FooterComponent
    ]
})
export class CategoryListComponent implements OnInit{

  categories: Category[] = [];

  constructor( private categoryService: CategoryService, private toastrService: ToastrService ) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    )
  }

  deleteCategoryById(id: number) {
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
        this.categoryService.deleteCategoryById(id).subscribe(
          ()=> this.listCategories()
        );
        Swal.fire({
          title: "Eliminado",
          text: "Categoría eliminada correctamente.",
          icon: "success"
        });
      }
    });
  }

}
