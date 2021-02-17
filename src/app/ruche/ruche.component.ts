import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import {User} from '../shared/user'
@Component({
  selector: 'app-ruche',
  templateUrl: './ruche.component.html',
  styleUrls: ['./ruche.component.sass']
})
export class RucheComponent implements OnInit {
  THEuser:User;
  constructor(userService:UserService) {
    userService.getUser().subscribe((el)=>{
      this.THEuser=el;
    });
  }

  ngOnInit(): void {
  }

}
