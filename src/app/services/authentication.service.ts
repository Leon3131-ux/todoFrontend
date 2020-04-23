import { Injectable } from '@angular/core';
import {Token} from "../classes/token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getPermissions(): string[]{
    if(sessionStorage.getItem('token')){
      return JSON.parse(sessionStorage.getItem('token')).permissions;
    }else {
      return [];
    }
  }

  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token');

  }

  setToken(token: Token){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token{
    return JSON.parse(sessionStorage.getItem('token'));
  }

  hasPermission(permission: string): boolean{
    return this.getPermissions().indexOf(permission) != -1;

  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
