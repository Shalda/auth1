import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, switchMap,catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {AzureAuthService} from "ngx-bstal13";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private _authService: AzureAuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this._authService.checkToken(false).pipe(
        map((authStatus: boolean)=>{
          if (!authStatus) {
            console.log('User is not logged in');
          }
          return this._authService.getUserData()?.idToken || ''
        }),
        switchMap(token => {
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(newRequest);
        })
      );
    }
}
