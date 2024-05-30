
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { SumaryOrderComponent } from './components/orders/sumary-order/sumary-order.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
  {path: 'top/offers', component: HomeComponent},

  {path: 'admin/product', component: ProductListComponent},

  {path: 'admin/product/addProduct', component: ProductAddComponent},

  {path: 'admin/product/update/:id', component: ProductAddComponent},

  {path: 'admin/category', component: CategoryListComponent},

  {path: 'admin/products', component: ProductListComponent},

  {path: 'admin/category/add', component: CategoryAddComponent},

  {path: 'admin/category/update/:id', component: CategoryAddComponent},

  {path: 'cart/detailproduct/:id', component: DetailProductComponent},

  {path: 'cart/sumary', component: SumaryOrderComponent, canActivate: [authGuard]},

  {path: '', component: AboutUsComponent},

 // {path: 'login', component: LoginComponent},

  {path: 'payment/success', component: PaymentSuccessComponent},

  {path: 'user/register', component: RegistrationComponent},

  {path: 'user/login', component: LoginComponent},

  {path: 'logout', component: LogoutComponent},

  {path: 'admin/users', component: UserListComponent},

  {path: 'admin/orders', component: OrderListComponent},

  {path: 'category/home/:id', component: CategoryHomeComponent},

  {path: 'user/contact-us', component: ContactUsComponent},


];
