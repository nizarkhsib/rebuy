import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddOfferComponent } from './add-offer/add-offer.component';

@NgModule({
  declarations: [
    AddOfferComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserDashboardRoutingModule,
    NgxEditorModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    NgxDropzoneModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class UserDashboardModule { }
