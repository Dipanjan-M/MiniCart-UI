import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerSosService {

  private _rootUrl: string = environment.baseUrl;
  private _getRegCustsUrl = this._rootUrl + '/mini-cart/sales-order/customers-sos';

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(this._getRegCustsUrl, { observe: 'response', withCredentials: true });
  }

}
