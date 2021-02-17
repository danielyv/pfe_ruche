import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import { Credential } from '../shared/credential'
import { LocalStorageService } from '../services/local-storage.service'
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  public user:Credential = {username: '', password: '', oauth: ''};
  public msg:String;
  public type:Boolean;
  constructor(private userService:UserService,
    private localStorageService:LocalStorageService,
    public snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.signUp('local',this.user).subscribe((result)=>{
      
      this.snackBar.open("Successfully signedup :)", 'Undo', {
        panelClass: ['mat-toolbar', 'mat-accent']
      });
    },
    (error)=>{
      this.snackBar.open("We can't sign you up :(", 'Undo', {
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    });
  }
}
