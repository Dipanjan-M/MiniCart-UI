import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  alert: any;
  items?: Item[];
  editingItem: Item = new Item();

  constructor(private itemSvc: ItemService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.itemSvc.getAllItems().subscribe(
      res => {
        this.items = <any>res.body;
      },
      err => {

        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }


        console.log(err.error);

        this.alert = {
          type: 'danger',
          title: 'Service Unavialable',
          message: err.error
        };
      }
    );
  }

  closeAlert(): void {
    this.alert = undefined;
  }

  edit(modalRef: any, item: Item): void {
    this.editingItem = item;
    this.modalService.open(modalRef, { ariaLabelledBy: 'edit-db-item', size: 'lg' });
  }

  delete(item: Item): void {
    window.confirm('Are you sure?');
  }

}
