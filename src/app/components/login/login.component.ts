import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  constructor(private loginService: LoginService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  submitLogin() {
    this.loginService.login(this.loginForm.getRawValue()).subscribe(data => {
        this.authenticationService.setToken(data.headers.get('Authorization'));
        this.router.navigate(['']);
    },
      ( () => {}));
  }
}
