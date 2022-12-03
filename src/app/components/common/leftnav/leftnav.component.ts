import { Component, OnInit } from '@angular/core';
import { CreateOrderModel } from 'src/app/models/create-order-model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/utils/common.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  cartOrders: CreateOrderModel[] = [];

  constructor(private _auth: AuthService, private commonSvc: CommonService) { }

  ngOnInit(): void {
    this.cartOrders = JSON.parse(window.sessionStorage.getItem('cart')!);
    this.commonSvc.newCartItemAddedEvent
    .subscribe((data:string) => {
      console.log('Event message from Component A: ' + data);
      this.cartOrders = JSON.parse(window.sessionStorage.getItem('cart')!);
    });
  }

  isLoggedIn(): boolean {
    return this._auth.loggedIn();
  }

  hasAdminRole(): boolean {
    return this._auth.isAdmin();
  }

}
