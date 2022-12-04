import { Injectable, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  @Output() newCartItemAddedEvent = new EventEmitter<string>();
  @Output() loginSuccessEvent = new EventEmitter<boolean>();
  // @Output() loginSuccessEventForLeftNav = new EventEmitter<boolean>();

  cartItemAdded(msg: string) {
    this.newCartItemAddedEvent.emit(msg);
  }

  loginSuccess(flag: boolean) {
    this.loginSuccessEvent.emit(flag);
    // this.loginSuccessEventForLeftNav.emit(flag);
  }

  getCartKeyForLoggedInUser(): string {
    let user = new User();
    user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    return 'cart-' + user.id;
  }

}
