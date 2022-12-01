import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  private _loginStatus!: boolean;

  @Input('loginStatus')
  set loginStatus(status: boolean) {
    this._loginStatus = status;
  }

  public isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this._loginStatus;
  }

}
