import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Signup } from 'src/app/models/signup.model';

import { ServerValidationError } from 'src/app/models/server-validation-error.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signupData?: Signup;
  valErrs?: ServerValidationError;

  alert: any;

  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor() { }

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
        if(msgs?.length != undefined) {
          return true;
        }
      }
    }
    return false;
  }

  onSubmit() {

    this.signupData = new Signup(
      this.registrationForm?.value.firstName!,
      this.registrationForm?.value.lastName!,
      this.registrationForm?.value.email!,
      this.registrationForm?.value.password!
    );

    this.valErrs = {
      "firstName": [
        "First name must not be blank",
        "First name should be in between 3 to 20 characters",
        "First name must contain alphabetical characters only and should start with an uppercase character"
      ],
      "lastName": [
        "Last name should be in between 3 to 20 characters"
      ],
      "password": [
        "Password must not be blank"
      ],
      // "email": [
      //   "Please enter a valid email"
      // ]
    };

    this.alert = {
      type: 'success',
      title: 'Success!',
      message: 'User registration is successful'
    };
  }

}
