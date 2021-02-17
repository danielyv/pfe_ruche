import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class JWTTokenService {
 
    jwtToken: string;
    decodedToken: { [key: string]: string };
 
    constructor(private localStorage:LocalStorageService) {
    }
  
    decodeToken() {
      this.jwtToken=this.localStorage.get('token')
      if (this.jwtToken) {
        this.decodedToken = jwt_decode(this.jwtToken);
      }
    }
 
    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }
 
    getId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken._id : null;
    }

 
    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }
 
    isTokenExpired(): boolean {
      const expiryTime: number = +this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}