import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    HeaderUserComponent, FooterComponent, FormsModule
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {


}

