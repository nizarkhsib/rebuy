import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/helpers/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { OfferDetailsComponent } from './navigation/offer-details/offer-details.component';
import { OffersListComponent } from './navigation/offers-list/offers-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: OffersListComponent,
        // children: [

        // ]
      },
      {
        path: ':id',
        component: OfferDetailsComponent
      },
      {
        path: 'user-dashboard',
        loadChildren: () => import('../user-dashboard/user-dashboard.module')
          .then(m => m.UserDashboardModule),
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module')
          .then(m => m.ProfileModule),
        canActivate: [
          AuthGuard
        ]
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule { }
