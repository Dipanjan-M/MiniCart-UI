import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  @Output() newCartItemAddedEvent = new EventEmitter<string>();

  cartItemAdded(msg: string) {
    this.newCartItemAddedEvent.emit(msg);
  }

}
