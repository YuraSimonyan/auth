import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

import {UserState} from '../store/user.state';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  @Select(UserState.isAuthorized)
  isAuthorized$: Observable<boolean>;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized$;
  }
}
