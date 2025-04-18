import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, takeUntil, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoggedUserDto } from 'src/app/shared/models/logged-user-dto';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {

  loggedUser: LoggedUserDto = null;
  isLogged = false;
  alive = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {

    this.loggedUser = this.authenticationService.currentUserSubject.getValue();
    this.loggedUser ? this.isLogged = true : this.isLogged = false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  navigateToLogin() {
    this.router.navigate(['auth']);
  }

  logout() {
    this.authenticationService.logout();
  }

  navigateToWriteOffer() {
    this.router.navigate(['user-dashboard/add-offer']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }
}
