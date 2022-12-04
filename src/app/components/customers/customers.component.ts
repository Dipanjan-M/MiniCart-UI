import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { CustomerSos } from 'src/app/models/customer-sos';
import { CustomerSosService } from 'src/app/services/customer-sos.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: CustomerSos[] = [];
  custs$?: Observable<CustomerSos[]>;

  filter = new FormControl('', { nonNullable: true });


  constructor(private custSosSvc: CustomerSosService, private router: Router) { }

  ngOnInit(): void {

    this.custSosSvc.getAllCustomers().subscribe(
      res => {
        this.customers = <any>res.body;
        this.custs$ = of(this.customers);
      },
      err => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/login']);
        }
      }
    );

  }

  search(text: string): CustomerSos[] {
    return this.customers.filter((cust) => {
      const term = text.toLowerCase();
      return (
        cust.custFirstName.toLowerCase().includes(term) ||
        cust.custLastName.toLowerCase().includes(term) ||
        cust.custEmail.toLowerCase().includes(term)
      );
    });
  }

  searchInTable() {
    let arr = this.search(this.filter.value? this.filter.value:'');
    this.custs$ = of(arr);
  }

}
