import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from "../header-user/header-user.component";
import { SessionStorageService } from '../../services/session-storage.service';
import { OrderState } from '../../common/order-state';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-payment-success',
    standalone: true,
    templateUrl: './payment-success.component.html',
    styleUrl: './payment-success.component.css',
    imports: [HeaderUserComponent, RouterModule, FooterComponent]
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private sessionStorage:SessionStorageService
  ){

  }


  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('order'));
    let order = this.sessionStorage.getItem('order');

    let formData = new FormData();

    formData.append('id',order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
      data => {
        console.log(data)
        console.log('LogoutComponent: '+ this.sessionStorage.getItem('token'))
        this.sessionStorage.removeItem('token');
        console.log('LogoutComponent eliminado: '+ this.sessionStorage.getItem('token'));

      }
    );



  }

}
