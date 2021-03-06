import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
