import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderQuickView } from 'src/app/models/order-quick-view';
import { OrderSnapshot } from 'src/app/models/order-snapshot.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  isLoading: boolean = true;
  alert: any;

  myOrders: OrderQuickView[] = [];
  orderSnap?: OrderSnapshot;
  orderTotalAmount: number = 0;
  user = new User();

  constructor(private orderSvc: OrderService, private router: Router, private modalService: NgbModal) {
    this.user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
  }

  ngOnInit(): void {
    this.orderSvc.getOrderByCustomerId(this.user.id).subscribe(
      res => {
        this.myOrders = <any>res.body;
      },
      err => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }
        if (err.status === HttpStatusCode.ServiceUnavailable) {
          this.alert = {
            type: 'danger',
            title: 'Service Unavialble!',
            message: err.error
          };
        }
      }, 
      () => {
        this.isLoading = false;
      }
    );
  }

  closeAlert(): void {
    this.alert = undefined;
  }

  getTotal(unitPrice: number, qty: number) {
    return unitPrice * qty;
  }

  viewBill(viewBillModal: any, orderId: number, totalOrderAmt: number) {
    this.orderTotalAmount = totalOrderAmt;
    this.orderSvc.getOrderByOrderId(orderId).subscribe(
      res => {
        this.orderSnap = <any>res.body;
        this.modalService.open(viewBillModal, { ariaLabelledBy: 'view-bill-details', size: 'lg' });
      },
      err => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }
        if (err.status === HttpStatusCode.ServiceUnavailable) {
          this.alert = {
            type: 'danger',
            title: 'Service Unavialble!',
            message: err.error
          };
        }
      }
    );
  }

}
