import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { CreateOrderModel } from 'src/app/models/create-order-model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { CommonService } from 'src/app/utils/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartKey?: string;

  myShoppingCart: CreateOrderModel[] = [];
  grandTotals = new Map<string, number>();

  alert: any;
  submitted: boolean = false;

  options: AnimationOptions = {
    path: '/assets/lottie-assets/75958-cat-empty.json'
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '35%',
    margin: '0 auto'
  };

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  close() {
    this.alert = undefined;
  }

  constructor(private commonSvc: CommonService, private orderSvc: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.submitted = false;
    this.cartKey = this.commonSvc.getCartKeyForLoggedInUser();
    if (window.localStorage.getItem(this.cartKey) !== null) {
      this.myShoppingCart = JSON.parse(window.localStorage.getItem(this.cartKey)!);
      this.myShoppingCart.forEach((data) => {
        this.grandTotals.set(data.orderDescription!, 0);
        data.itemNamesAndCount?.forEach((items) => {
          let tp = items.count * items.unitPrice;
          this.grandTotals.set(data.orderDescription!, this.grandTotals.get(data.orderDescription!)! + tp);
        });
      });
    }
  }

  getGrandTotal(sln: string): number {
    return this.grandTotals.get(sln)!;
  }

  placeOrder(cartOrder: CreateOrderModel) {
    if(!this.submitted) {
      this.submitted = true;
    } else {
      console.log("Still processing previous request. Unable to proceed with current request. Exiting....");
      return;
    }
    console.log('Processing request.....');
    let user = new User();
    user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    cartOrder.customerId = user.id;
    this.orderSvc.createNewOrder(cartOrder).subscribe(
      res => {
        this.removeOrderFromCart(cartOrder);
        console.log('Request completed with success');
        this.submitted = false;
      },
      err => {
        if(err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }
        if(err.status === HttpStatusCode.BadRequest) {
          this.alert = {
            type: 'danger',
            title: 'Bad Request',
            message: err.body
          };
        }
        if(err.status === HttpStatusCode.InternalServerError) {
          this.alert = {
            type: 'danger',
            title: 'Internal Server Error',
            message: err.body
          };
        }
        console.log('Request completed with failure');
        this.submitted = false;
      }
    );
  }

  removeOrderFromCart(cartOrder: CreateOrderModel) {
    this.myShoppingCart.forEach((data, index, object) => {
      if (data.orderDescription === cartOrder.orderDescription) {
        this.grandTotals.delete(data.orderDescription!);
        object.splice(index, 1);
      }
    });
    window.localStorage.setItem(this.cartKey!, JSON.stringify(this.myShoppingCart));
    this.commonSvc.cartItemAdded("Order from cart has been removed successfully");
  }

}
