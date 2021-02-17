import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'; 
import { JWTTokenService } from '../services/jwttoken.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import {JWT} from '../shared/jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private loginService: UserService,
              private authStorageService: LocalStorageService,
              private jwtService: JWTTokenService,
              private router:Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      if (this.jwtService.getId()) {
          if (this.jwtService.isTokenExpired()) {
            this.loginService.notifyLogin(false);
            this.router.navigate(['/login'])

            // Should Redirect Sig-In Page
          } else {
            return true;
          }
      } else {
        return new Promise((resolve) => {
          this.loginService.signIncallBack(this.authStorageService.get("mode"),JSON.parse(this.authStorageService.get("credential"))).toPromise().then((e) => {
             this.authStorageService.set("token",e.toString());
             resolve(true);
          }).catch((e) => {
            this.loginService.notifyLogin(false);
            this.router.navigate(['/login'])
            // Should Redirect Sign-In Page
          });
        });
      }
  }
  canActivateBool(): boolean {
      if (this.jwtService.getId()) {
          if (this.jwtService.isTokenExpired()) {
            return false;
            // Should Redirect Sig-In Page
          } else {
            return true;
          }
      } else {
        new Promise((resolve) => {
          this.loginService.signIncallBack(this.authStorageService.get("mode"),JSON.parse(this.authStorageService.get("credential"))).toPromise().then((e) => {
             this.authStorageService.set("token",e.toString());
             return true;
          }).catch((e) => {
            return false;
            // Should Redirect Sign-In Page
          });
        });
      }
  }
}