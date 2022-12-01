import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _loginStatus!: boolean;

  public date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  @Input('loginStatus')
  set loginStatus(status: boolean) {
    this._loginStatus = status;
  }

  isLoggedIn(): boolean {
    return this._loginStatus;
  }

}
