import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ToastrModule } from "ngx-toastr";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HomeComponent,
    ProductListComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontCurso';
}
