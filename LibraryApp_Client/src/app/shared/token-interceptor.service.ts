import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req:any,next:any){
    let authenticateService = this.injector.get(AuthService)

    //clone the http request
    let tokenizedReq = req.clone(
      {
        setHeaders : {
          Authorization : `Bearer ${authenticateService.getToken()}`
        }
      }
    )
    return next.handle(tokenizedReq);
  }

}

