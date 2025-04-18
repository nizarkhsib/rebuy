import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result: boolean;
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      result = true;
    } else {
      result = false;
      // not logged in so redirect to login page with the return url
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    }
    return result;
  }
}
