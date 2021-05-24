import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from '../Services/authentication.service';
import {UserToken} from '../models/user-token';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser: UserToken;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUser) {
      if (this.currentUser.roles[0].authority == 'ROLE_ADMIN' && state.url.includes('admin')){
        console.log("chào admin");
        // this.router.navigate(['admin'], {queryParams: {returnUrl: state.url}});
        return true;
      }
      if (this.currentUser.roles[0].authority == 'ROLE_USER' && state.url.includes('index')){
        console.log("chào user");
        // this.router.navigate(['index'], {queryParams: {returnUrl: state.url}});
        return true;
      }
      if (this.currentUser.roles[0].authority == 'ROLE_DOCTOR' && state.url.includes('index')){
        console.log("chào ROLE_DOCTOR");
        // this.router.navigate(['index'], {queryParams: {returnUrl: state.url}});
        return true;
      }
      return false;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
