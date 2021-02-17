import { Injectable,Output, EventEmitter,Input } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Credential} from '../shared/credential'
import { LocalStorageService } from './local-storage.service'
import { map,catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {JWT} from '../shared/jwt'
import {Router} from '@angular/router'
import {JWTTokenService} from './jwttoken.service'
import {User} from '../shared/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() logged: EventEmitter<boolean> = new EventEmitter();
  
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private localStorage:LocalStorageService,
    private router:Router,
    private jwtTokenS:JWTTokenService) { }
  notifyLogin(bool){
    this.logged.emit(bool)
  }
  signUp(mode:String,credential:Credential):Observable<String>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<String>(baseURL+'users/signup',credential,httpOptions)
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  signIncallBack(mode:String=null,credential:Credential=null):Observable<JWT>{
    const httpOptions = {
      
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    
    return this.http.post<JWT>(baseURL + 'users/login' , credential, httpOptions)
                      .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
  logout(){
    localStorage.clear();
    this.logged.emit(false);
    this.http.get<any>(baseURL + 'users/logout')
                      .pipe(catchError(this.processHTTPMsgService.handleError));
    this.router.navigate(["login"])
  }
  getUser():Observable<User>{
    return this.http.get<User>(baseURL+'users/'+this.jwtTokenS.getId())
          .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
