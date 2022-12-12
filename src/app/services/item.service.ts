import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _rootUrl = environment.baseUrl;
  private _getAllItems = this._rootUrl + '/mini-cart/item/items';
  private _searchItem = this._rootUrl + '/mini-cart/item/items/';
  private _itemCrudUrl = this._rootUrl + '/mini-cart/item/item';

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(this._getAllItems, { observe: 'response', withCredentials: true });
  }

  updateItem(item: Item) {
    return this.http.put(this._itemCrudUrl, item, { observe: 'response', withCredentials: true });
  }

  addNewItem(item: Item) {
    return this.http.post(this._itemCrudUrl, item, { observe: 'response', withCredentials: true });
  }

  deleteAnItem(item: Item) {
    return this.http.delete(this._itemCrudUrl + '/' + item.id, { observe: 'response', withCredentials: true });
  }

}
