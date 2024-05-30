import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../common/order';
import { FooterComponent } from "../footer/footer.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-order-list',
    standalone: true,
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.css',
    imports: [FooterComponent, HeaderAdminComponent, CommonModule, RouterLink]
})
export class OrderListComponent implements OnInit{
  orders : Order[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrders().subscribe(
      data =>{this.orders = data
      console.log(data)
      }
    );
  }
}
