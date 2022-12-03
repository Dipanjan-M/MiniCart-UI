import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _rootUrl = environment.baseUrl;
  private _getAllItems = this._rootUrl + '/mini-cart/item/items';
  private _searchItem = this._rootUrl + '/mini-cart/item/items/';

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(this._getAllItems, { observe: 'response', withCredentials: true });
  }

}
