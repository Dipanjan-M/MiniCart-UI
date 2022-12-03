import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { ItemAndQty } from 'src/app/models/item-and-qty';
import { CreateOrderModel } from 'src/app/models/create-order-model';
import { User } from 'src/app/models/user.model';
import { CountItem } from 'src/app/models/count-item.model';
import { CommonService } from 'src/app/utils/common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alert: any;
  items?: Item[];
  submitted: boolean = false;

  shoppingCart: CreateOrderModel[] = [];

  shoppingDescList: string[] = [];
  shoppingDesc?: string;
  itemAndQty = new ItemAndQty();
  createNewOrder: CreateOrderModel = new CreateOrderModel();


  closeResult = '';

  modalsNumber = 0;

  constructor(private modalService: NgbModal, private itemSvc: ItemService, private commonSvc: CommonService) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  ngOnInit(): void {
    this.itemSvc.getAllItems().subscribe(
      res => {
        this.items = <any>res.body;
      },
      err => {

        this.alert = {
          type: 'danger',
          title: 'Service Unavialable',
          message: 'Item service is temporarily down'
        };
      }
    );
  }

  closeAlert(): void {
    this.alert = undefined;
  }

  open(content: any, item: Item) {
    this.shoppingDesc = undefined;
    this.shoppingDescList = new Array();
    if (window.sessionStorage.getItem('cart') !== null) {
      this.shoppingCart = JSON.parse(window.sessionStorage.getItem('cart')!);
      this.shoppingCart.forEach((order) => {
        this.shoppingDescList.push(order.orderDescription!);
      });
    }

    this.itemAndQty.name = item.name;
    this.itemAndQty.qty = 1;
    this.itemAndQty.desc = item.description;
    this.itemAndQty.price = item.price;

    this.modalService.open(content, { ariaLabelledBy: 'add-item-to-cart', size: 'lg' });
  }

  openAnother(createNewShoppingList: any) {
    let user: User = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    this.createNewOrder.orderDescription = user.firstName + '\'s order on ' + new Date().toLocaleString();
    this.modalService.open(createNewShoppingList, { ariaLabelledBy: 'new-shopping-list-modal' });
  }

  addNewOrderModel(): void {
    this.shoppingCart.push(this.createNewOrder);
    this.shoppingDescList = new Array();
    window.sessionStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    if (window.sessionStorage.getItem('cart') !== null) {
      this.shoppingCart = JSON.parse(window.sessionStorage.getItem('cart')!);
      this.shoppingCart.forEach((order) => {
        this.shoppingDescList.push(order.orderDescription!);
      });
    }
    this.commonSvc.cartItemAdded("New Shopping list added");
  }

  addToCart(): void {
    this.submitted = true;
    this.shoppingCart = JSON.parse(window.sessionStorage.getItem('cart')!);
    let modifiedCart: CreateOrderModel[] = [];
    this.shoppingCart.forEach(data => {
      if (data.orderDescription === this.shoppingDesc) {
        if (data.itemNamesAndCount !== undefined) {
          let flag = 0;
          data.itemNamesAndCount.forEach(can => {
            if (can.itemName == this.itemAndQty.name) {
              flag = 1;
              can.count = can.count + this.itemAndQty.qty;
            }
          });
          if(flag === 0) {
            data.itemNamesAndCount.push(new CountItem(this.itemAndQty.name, this.itemAndQty.qty));
          }
        } else {
          data.itemNamesAndCount = Array.of(new CountItem(this.itemAndQty.name, this.itemAndQty.qty));
        }
      }
      modifiedCart.push(data);
    });
    console.log(JSON.stringify(modifiedCart));
    window.sessionStorage.setItem('cart', JSON.stringify(modifiedCart));
    this.submitted = false;
  }

}
