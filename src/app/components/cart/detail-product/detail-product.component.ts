import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../../header-admin/header-admin.component';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderUserComponent } from '../../header-user/header-user.component';
import { ItemCart } from '../../../common/item-cart';
import { HomeService } from '../../../services/home.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-detail-product',
    standalone: true,
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.css',
    imports: [HeaderUserComponent, CommonModule, FormsModule, ToastrModule, FooterComponent]
})
export class DetailProductComponent {
  id : number = 0;
  name :string ='';
  description :string = '';
  price : number =0;
  urlImage : string = '';
  quantity : number = 0;

  ngOnInit(): void {
    this.getProductById();
  }

  constructor(private homeService: HomeService,private activatedRoute: ActivatedRoute, private cartService: CartService, private toastr: ToastrService ){

  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        if(id){
          this.homeService.getProductById(id).subscribe(
            data =>{
              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.precio;
            }
          );
        }
      }

    );
  }

  addCart(id : number){
    let item = new ItemCart(id, this.name, this.quantity, this.price);

    this.cartService.addItemCart(item);

    console.log("Total carrito: ");
    console.log(this.cartService.totalCart());

    this.toastr.success('Producto añadido al carrito de compras.', 'Carrito de compras');

  }
}
