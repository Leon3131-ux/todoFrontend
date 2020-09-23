import { Injectable } from '@angular/core';
import {User} from '../classes/user';
import {ApiService} from './api-service.service';
import {Token} from '../classes/token';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(user: User): Observable<Token> {
    return this.apiService.postSingle('/login', user);
  }

}
