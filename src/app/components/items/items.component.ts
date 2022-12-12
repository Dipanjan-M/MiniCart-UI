import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  isLoading: boolean = true;
  alert: any;
  items?: Item[];
  editingItem: any;
  addItemButtonClicked: boolean = false;
  newItemDto: any;
  submitted: boolean = false;
  serverValidation: any;

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

        this.alert = {
          type: 'danger',
          title: 'Service Unavilable',
          message: err.error
        };
      }, 
      () => {
        this.isLoading = false;
      }
    );
  }

  closeAlert(): void {
    this.alert = undefined;
  }

  openAddItemForm(): void {
    this.newItemDto = new Item();
    this.addItemButtonClicked = true;
  }

  closeAddItemForm(): void {
    this.serverValidation = undefined;
    this.addItemButtonClicked = false;
  }

  resetAddItemForm(createForm: NgForm) {
    this.serverValidation = undefined;
    this.newItemDto = new Item();
    createForm.reset();
  }

  evaluateFieldError(field: string): boolean {
    if (this.serverValidation != undefined) {
      if (field in this.serverValidation) {
        let msgs = this.serverValidation[field as keyof typeof this.serverValidation];
        if (msgs?.length != undefined) {
          return true;
        }
      }
    }
    return false;
  }

  addItemReq(): void {
    this.isLoading = true;
    this.submitted = true;
    this.serverValidation = undefined;
    this.itemSvc.addNewItem(this.newItemDto).subscribe(
      res => {
        let addedNewItem: Item = <any>res.body;
        this.items?.push(addedNewItem);
        this.submitted = false;
        this.closeAddItemForm();
      },
      err => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        } else if (err.status === HttpStatusCode.BadRequest) {
          this.serverValidation = err.error;
        } else if (err.status === HttpStatusCode.Conflict) {
          this.alert = {
            type: 'warning',
            title: 'Oops!',
            message: err.error
          };
        }
        else if (err.status === HttpStatusCode.ServiceUnavailable) {
          this.alert = {
            type: 'danger',
            title: 'Yikes!',
            message: err.error
          };
        } else {
          this.alert = {
            type: 'danger',
            title: 'Interval Server Error',
            message: err.error
          };
        }
        this.submitted = false;
        this.isLoading = false;
      }, 
      () => {
        this.isLoading = false;
      }
    );
  }

  edit(modalRef: any, item: Item): void {
    this.editingItem = new Item(item.id, item.name, item.description, item.price);
    this.modalService.open(modalRef, { ariaLabelledBy: 'edit-db-item', size: 'lg' });
  }

  submitEditReq() {
    this.isLoading = true;
    this.submitted = true;
    this.itemSvc.updateItem(this.editingItem).subscribe(
      res => {
        let updatedItem: Item = <any>res.body;
        this.items?.forEach((item, index, object) => {
          if (item.id === updatedItem.id) {
            object.splice(index, 1, updatedItem);
          }
        });
        this.submitted = false;
      },
      err => {
        if (err.status === HttpStatusCode.BadRequest) {
          this.alert = {
            type: 'warning',
            title: 'Bad Request',
            message: err.error
          };
        } else if (err.status === HttpStatusCode.ServiceUnavailable) {
          this.alert = {
            type: 'danger',
            title: 'Yikes!',
            message: err.error
          };
        } else {
          this.alert = {
            type: 'danger',
            title: 'Internal Server Error',
            message: err.error
          };
        }
        this.submitted = false;
        this.isLoading = false;
      }, 
      () => {
        this.isLoading = false;
      }
    );
  }

  delete(item: Item): void {
    console.log();
    if (window.confirm('Are you sure?')) {
      this.itemSvc.deleteAnItem(item).subscribe(
        res => {
          let deletedItem: Item = <any>res.body;
          this.items?.forEach((data, index, arr) => {
            if (data.id === deletedItem.id) {
              arr.splice(index, 1);
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
