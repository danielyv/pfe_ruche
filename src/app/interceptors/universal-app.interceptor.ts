import { Injectable, Inject, Optional } from'@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
 
  constructor( private authService: AuthService) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getJWTToken();
    req = req.clone({
      url:  req.url,
      setHeaders: {
        'Access-Control-Allow-Origin':'*',
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}