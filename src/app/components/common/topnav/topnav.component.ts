import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/utils/common.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  private _loginStatus!: boolean;
  user = new User();

  @Input('loginStatus')
  set loginStatus(status: boolean) {
    this._loginStatus = status;
  }

  public isCollapsed: boolean = true;

  constructor(private authSvc: AuthService, private commonSvc: CommonService) { 
    if(window.sessionStorage.getItem('userDetails') !== null) {
      this.user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
    }
  }

  ngOnInit(): void { 
    this.commonSvc.loginSuccessEvent.subscribe((data: boolean)=>{
      if(data) {
        this.user = JSON.parse(window.sessionStorage.getItem('userDetails')!);
      }
    });
  }

  isLoggedIn(): boolean {
    return this._loginStatus;
  }

  logout(): void {
    this.authSvc.logout();
  }

}
