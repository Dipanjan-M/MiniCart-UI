import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alert: any = {
    type: 'danger',
    title: 'Error!',
    message: 'Login failed due to login error.'
  };

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.alert = undefined;
  }

  authStatus!: string;
  model = new User();
  submitted: boolean = false;
  hide: boolean = true;

  validateUser(loginForm: NgForm) {
    console.log(loginForm)

  }

}
