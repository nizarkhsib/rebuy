import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { OffersListComponent } from './navigation/offers-list/offers-list.component';
import { OfferDetailsComponent } from './navigation/offer-details/offer-details.component';

@NgModule({
  declarations: [
    NavigationComponent,
    OffersListComponent,
    OfferDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ComponentsModule,
    HomeRoutingModule,
    RouterModule,
    MatPaginatorModule,
    MatCardModule,
    FlexLayoutModule,
    MatSliderModule,
    MatMenuModule
  ],
  providers: [

  ],
})
export class HomeModule { }
