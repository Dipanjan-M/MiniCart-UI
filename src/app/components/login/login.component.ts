import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { 
    window.sessionStorage.removeItem('userDetails');
    window.sessionStorage.removeItem('token');
  }

  ngOnInit(): void { }

  alert: any;
  submitted: boolean = false;
  hide: boolean = true;
  loginModel?: User;

  close(): void {
    this.alert = undefined;
  }

  validateUser(loginForm: NgForm) {
    this.submitted = true;
    this.loginModel = new User();
    this.loginModel.email = loginForm.value.email;
    this.loginModel.password = loginForm.value.pass;

    this._auth.validateLoginData(this.loginModel).subscribe(
      res => {
        window.sessionStorage.setItem('token', res.headers.get('Authorization')!);
        this.loginModel = <any>res.body;
        window.sessionStorage.setItem('userDetails', JSON.stringify(this.loginModel));
        this.submitted = false;
        this._router.navigate(['/dashboard']);
      },
      err => {
        let serverErr = err.error;
        this.alert = {
          type: 'danger',
          title: 'Authentication Error!',
          message: serverErr.msg
        };
        this.submitted = false;
      }
    );
  }

}
