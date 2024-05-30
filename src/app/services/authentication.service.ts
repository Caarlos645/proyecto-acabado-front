import { Jwtclient } from './../common/jwtclient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { Userdto } from '../common/userdto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = 'https://proyecto-final-ecommerce-production.up.railway.app/api/v1/security';
  constructor(private httpClient: HttpClient) { }

  register(user : User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl+"/register", user);
  }

  login(userDto:Userdto):Observable<Jwtclient>{
    return this.httpClient.post<Jwtclient>(this.apiUrl+"/login", userDto);

  }
}
