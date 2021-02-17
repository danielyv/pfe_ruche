import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import { Credential } from '../shared/credential'
import { LocalStorageService } from '../services/local-storage.service'
import {JWT} from '../shared/jwt'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user:Credential = {username: '', password: '', oauth: ''};
  constructor(private userService:UserService,
      private localStorageService:LocalStorageService,
      public snackBar:MatSnackBar,
      private router:Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.signIncallBack('local',this.user).subscribe((result)=>{
        this.localStorageService.set('token',result.token.toString());
        this.userService.notifyLogin(true)
        this.router.navigate(['/'])
        this.snackBar.open("Successfully connected :)", 'Undo', {
          panelClass: ['mat-toolbar', 'mat-accent']
        });
      },
      (error)=>{
        this.snackBar.open("We can't log you in :(", 'Undo', {
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        
      }
     
    );
  }

}
