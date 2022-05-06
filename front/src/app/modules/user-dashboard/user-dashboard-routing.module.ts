import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from './add-offer/add-offer.component';

const routes: Routes = [
  {
    path: 'user-dashboard',
    pathMatch: 'full',
    redirectTo: 'add-offer',
  },
  {
    path: 'add-offer',
    component: AddOfferComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
