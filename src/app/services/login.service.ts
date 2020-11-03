import { Injectable } from '@angular/core';
import {User} from '../classes/user';
import {ApiService} from './api-service.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(user: User): Observable<any> {
    return this.apiService.postLogin('/login', user);
  }

}
