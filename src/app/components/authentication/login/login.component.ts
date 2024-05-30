import { Userdto } from './../../../common/userdto';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from "../../header-user/header-user.component";
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [HeaderUserComponent, FormsModule, FooterComponent, RouterLink, CommonModule]
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
  }

  constructor(private authentication: AuthenticationService, private sessionStorage: SessionStorageService, private router: Router) {}

  login() {
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      token =>{
       this.sessionStorage.setItem('token', token);
       if (token.type == 'ADMIN') {
        this.router.navigate(['/admin/product']);
       } else {
        this.router.navigate(['/']);
       }
    },
      error => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    );
  }
}
