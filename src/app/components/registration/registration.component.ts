import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Signup } from 'src/app/models/signup.model';
import { HttpStatusCode } from '@angular/common/http';

import { ServerValidationError } from 'src/app/models/server-validation-error.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  valErrs?: ServerValidationError;
  signUpRes: any;

  alert: any;

  submitted: boolean = false;

  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _auth: AuthService) { }

  ngOnInit(): void { }

  close() {
    this.alert = undefined;
  }

  onReset() {
    this.valErrs = undefined;
    this.registrationForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  evaluateFieldError(field: string): boolean {
    if (this.valErrs != undefined) {
      if (field in this.valErrs) {
        let msgs = this.valErrs[field as keyof typeof this.valErrs];
        if (msgs?.length != undefined) {
          return true;
        }
      }
    }
    return false;
  }

  onSubmit() {

    this.submitted = true;

    let signupData = new Signup(
      this.registrationForm?.value.firstName!,
      this.registrationForm?.value.lastName!,
      this.registrationForm?.value.email!,
      this.registrationForm?.value.password!
    );

    this._auth.registerUserIntoSystem(signupData).subscribe(
      res => {
        console.log(res);
        this.signUpRes = res.body;
        this.alert = {
          type: 'success',
          title: 'Success!',
          message: 'User registration is successful for <b>' + this.signUpRes?.firstName + ' ' + this.signUpRes?.lastName + '</b><br/>' + 'with email : <b>' + this.signUpRes?.email + '</b> and role : <b>' + this.signUpRes?.role.roleName + '</b>'
        };
        this.onReset();
        this.submitted = false;
      },
      err => {
        if (err.status == HttpStatusCode.BadRequest) {
          this.valErrs = err.error;
        } else if (err.status == HttpStatusCode.Conflict) {
          this.alert = {
            type: 'warning',
            title: 'Oops!',
            message: err.error
          };
        } else {
          this.alert = {
            type: 'danger',
            title: 'Yaieks!',
            message: err.error
          };
        }
        this.submitted = false;
      }
    );
  }

}
