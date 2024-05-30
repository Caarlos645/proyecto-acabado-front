import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderUserComponent } from "../header-user/header-user.component";
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-category-home',
    standalone: true,
    templateUrl: './category-home.component.html',
    styleUrl: './category-home.component.css',
    imports: [CommonModule, RouterLink, FooterComponent, HeaderUserComponent]
})
export class CategoryHomeComponent {
  products: Product[] = [];
  id : number = 0;
  name :string ='';
  description :string = '';
  price : number =0;
  urlImage : string = '';
  quantity : number = 0;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getProductsByCategoryId();
  }

  getProductsByCategoryId() {
    this.activatedRoute.params.subscribe(
      c => {
        let id = c['id'];
        console.log(id);
        if (id) {
          this.productService.getProductsByCategoryId(id).subscribe(
            data =>{
              this.products = data
            }
          );
        }
      }
    );
  }
}
