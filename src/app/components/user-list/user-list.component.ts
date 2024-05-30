import { Component, OnInit } from '@angular/core';
import { User } from '../../common/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css',
    imports: [HeaderAdminComponent, RouterLink, CommonModule, FooterComponent]
})
export class UserListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data
    );
  }

  deleteUserById(id: number) {
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
        this.userService.deleteUserById(id).subscribe(
          ()=> this.listUsers()
        );
        Swal.fire({
          title: "Eliminado",
          text: "Producto eliminado correctamente.",
          icon: "success"
        });
      }
    });

  }
}
