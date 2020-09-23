import {
  HttpInterceptor, HttpEvent, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isLoggedIn()) {
      const authHeader = request.clone({
        setHeaders: {Authorization: 'Bearer ' + this.authenticationService.getToken().access}
      });
      return next.handle(authHeader);
    }
    return next.handle(request);
  }
}
