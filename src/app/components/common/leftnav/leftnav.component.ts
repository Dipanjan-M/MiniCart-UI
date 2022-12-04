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

  cartKey?: string;

  cartOrders: CreateOrderModel[] = [];

  constructor(private _auth: AuthService, private commonSvc: CommonService) {
    if (window.sessionStorage.getItem('userDetails') !== null) {
      this.cartKey = this.commonSvc.getCartKeyForLoggedInUser();
      this.cartOrders = JSON.parse(window.localStorage.getItem(this.cartKey!)!);
    }
  }

  ngOnInit(): void {
    this.commonSvc.loginSuccessEvent.subscribe((data: boolean) => {
      if (data) {
        this.cartKey = this.commonSvc.getCartKeyForLoggedInUser();
        this.cartOrders = JSON.parse(window.localStorage.getItem(this.cartKey!)!);
      }
    });
    this.commonSvc.newCartItemAddedEvent
      .subscribe((data: string) => {
        console.log('Event message from Component A: ' + data);
        this.cartOrders = JSON.parse(window.localStorage.getItem(this.cartKey!)!);
      });
  }

  isLoggedIn(): boolean {
    return this._auth.loggedIn();
  }

  hasAdminRole(): boolean {
    return this._auth.isAdmin();
  }

}
