import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderAdminComponent } from '../../header-admin/header-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Category } from '../../../common/category';
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-category-add',
    standalone: true,
    templateUrl: './category-add.component.html',
    styleUrl: './category-add.component.css',
    imports: [
        HeaderAdminComponent,
        FormsModule,
        FooterComponent
    ]
})
export class CategoryAddComponent implements OnInit{

  id: number = 0;
  name: string = "";

  constructor( private categoryService: CategoryService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    let category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe(
      response => {
        this.toastr.success('Categoría registrada correctamente.','Categorias');
        this.router.navigate(['admin/category']);
      }
    );
  }

  getCategoryById() {
    this.activatedRoute.params.subscribe(
      category => {
        let id = category['id'];
        if (id) {
          this.categoryService.getCategoryById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name;
            }
          );
        }
      }
    );
  }

}
