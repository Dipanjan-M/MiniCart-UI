import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _rootUrl = environment.baseUrl;
  private _ordrQckViewUrl = this._rootUrl + '/mini-cart/sales-order/orders?customerId=';
  private _orderSnapsUrl = this._rootUrl + '/mini-cart/sales-order/orders/';
  private _createOrderUrl = this._rootUrl + '/mini-cart/sales-order/orders';

  constructor(private http: HttpClient) { }

  getOrderByCustomerId(custId: number) {
    return this.http.get(this._ordrQckViewUrl + custId, { observe: 'response', withCredentials: true });
  }

  getOrderByOrderId(orderId: number) {
    return this.http.get(this._orderSnapsUrl + orderId, { observe: 'response', withCredentials: true });
  }

  createNewOrder(order: any) {
    return this.http.post(this._createOrderUrl, order, { observe: 'response', withCredentials: true });
  }

}
