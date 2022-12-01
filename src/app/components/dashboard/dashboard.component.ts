import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [
    {
      "id": 1,
      "name": "Laptop",
      "description": "Compact electronic computer",
      "price": 80000.0
    },
    {
      "id": 2,
      "name": "Smartphone",
      "description": "Samsung latest Smart phone",
      "price": 22500.0
    },
    {
      "id": 3,
      "name": "Cookies",
      "description": "Biskfarm cookies & snacks",
      "price": 125.5
    },
    {
      "id": 4,
      "name": "Cold-drinks",
      "description": "Coca-cola cold drinks",
      "price": 99.79
    },
    {
      "id": 5,
      "name": "Rice",
      "description": "10Kg rice bag from Ganesh",
      "price": 550.0
    },
    {
      "id": 6,
      "name": "Washing-Machine",
      "description": "BOSCH heavy duty washing machine (Front load)",
      "price": 35378.56
    },
    {
      "id": 7,
      "name": "QLED-TV",
      "description": "Samsung NEO QLED TV",
      "price": 278586.89
    },
    {
      "id": 8,
      "name": "Trousers(M)",
      "description": "Trousers for Men",
      "price": 999.0
    },
    {
      "id": 9,
      "name": "Trousers(F)",
      "description": "Trousers for women",
      "price": 999.0
    },
    {
      "id": 10,
      "name": "iPhone-X",
      "description": "iPhone 10 from Apple Inc., 128GB",
      "price": 79999.0
    },
    {
      "id": 11,
      "name": "Macbook Pro",
      "description": "Latest Macbook from Apple Inc. Pro version",
      "price": 250000.0
    },
    {
      "id": 12,
      "name": "Shampoo",
      "description": "Sunsilk shampoo from HU LTD. 450ml",
      "price": 349.0
    },
    {
      "id": 13,
      "name": "T-shirt",
      "description": "T-shirts for men",
      "price": 500.0
    },
    {
      "id": 14,
      "name": "Camera",
      "description": "DSLR camera from Sony",
      "price": 85000.0
    }
  ];

  closeResult = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    console.log(content);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
