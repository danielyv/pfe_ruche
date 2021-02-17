import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Ruche} from '../shared/ruche'
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RucheService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getRuche(id:String):Observable<Ruche>{
    return this.http.get<Ruche>(baseURL + 'ruche/'+id)
                      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}

