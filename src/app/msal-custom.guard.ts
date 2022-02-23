import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AzureAuthService} from "ngx-bstal13";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MsalCustomGuard {
  constructor(private _router: Router,
              private _auth: AzureAuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.checkToken(false).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          console.log('User is not logged in');
          return false;
        }
        return true;
      })
    );
  }
}
