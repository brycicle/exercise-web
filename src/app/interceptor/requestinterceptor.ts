import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Requestinterceptor implements HttpInterceptor {
  private userToken: any;

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userToken = JSON.parse(sessionStorage.getItem('userToken'));
    if (this.userToken === null || this.userToken === undefined) {
      return next.handle(req);
    } else {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization : 'Bearer ' + this.userToken.jwtToken
        })
      });
      return next.handle(authReq);
    }
  }
}
