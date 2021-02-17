import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthorizeGuard} from '../guards/authorize.guard'
import { UserService} from '../services/user.service'
import {LocalStorageService} from '../services/local-storage.service'
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public isLogged:boolean;
  public isMenuOpen:boolean;
  constructor(public userService:UserService,
    private localStorage:LocalStorageService,
    private authorizeGuard:AuthorizeGuard) {
    userService.logged.subscribe((state)=>{
      this.isLogged=state;
    })
    this.isLogged=authorizeGuard.canActivateBool()
  }
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
  ngOnInit(): void {
  }

}
