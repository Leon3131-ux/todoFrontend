import { Injectable } from '@angular/core';
import {Token} from '../classes/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getRoles(): string[] {
    if (sessionStorage.getItem('token')) {
      return JSON.parse(sessionStorage.getItem('token')).groups;
    } else {
      return [];
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');

  }

  setToken(token: Token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  hasRole(role: string): boolean {
    return this.getRoles().indexOf(role) !== -1;
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
