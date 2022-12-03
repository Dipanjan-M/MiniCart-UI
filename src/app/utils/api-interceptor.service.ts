import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  user = new User();

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let setAuthorizedReq = req;
    this.user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    if (this.user && this.user.email && this.user.password && this.user.password !== '') {
      setAuthorizedReq = req.clone({
        setHeaders: {
          Authorization: 'Basic ' + window.btoa(this.user.email + ':' + this.user.password)
        }
      });
      this.user.password = '';
      window.sessionStorage.setItem('userDetails', JSON.stringify(this.user));
    } else {
      let authorization = window.sessionStorage.getItem('token');
      if (authorization) {
        setAuthorizedReq = req.clone({
          setHeaders: {
            Authorization: authorization
          }
        });
      }
    }
    return next.handle(setAuthorizedReq);
  }
}
