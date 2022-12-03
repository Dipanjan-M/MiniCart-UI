import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../models/signup.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _rootUrl = environment.baseUrl;
  private _registrationUrl = this._rootUrl + '/mini-cart/customer/customer';
  private _loginUrl = this._rootUrl + '/mini-cart/customer/authorize';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUserIntoSystem(user: Signup) {
    return this.http.post(this._registrationUrl, user, { observe: 'response' });
  }

  validateLoginData(user: User) {
    window.sessionStorage.setItem('userDetails', JSON.stringify(user));
    return this.http.get(this._loginUrl, { observe: 'response', withCredentials: true });
  }

  loggedIn(): boolean {
    return !!window.sessionStorage.getItem('token');
  }

  isAdmin(): boolean {
    let user = new User();
    user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    return user.roleName === 'ADMIN';
  }

  logout(): void {
    window.sessionStorage.removeItem('userDetails');
    window.sessionStorage.removeItem('token');
    this._router.navigate(['/home']);
  }
}
