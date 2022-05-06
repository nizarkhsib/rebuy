import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { Offer } from 'src/app/shared/models/offer';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddOfferComponent implements OnInit, OnDestroy {
  html: '';
  loading = false;
  alive = true;
  editor: Editor;
  offerForm: FormGroup;
  file: File;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private offersService: OffersService) {

  }

  ngOnInit(): void {

    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.editor = new Editor();

  }

  get f(): any { return this.offerForm.controls; }

  ngOnDestroy(): void {
    this.alive = false;
    this.editor.destroy();
  }

  saveOffer() {
    const loggedUser = this.authenticationService.currentUserSubject.getValue();

    const offer: Offer = {
      title: this.formValue.title,
      description: this.formValue.content,
      userId: loggedUser._id
    };
    this.offersService.postWithPhoto(offer, this.file).subscribe(
      () => {
        this.router.navigate(['../']);
      }
    )
  }

  private get formValue() {
    return this.offerForm.value;
  }

  onSelect(event) {
    this.file = event.addedFiles[0];
  }

  onRemove(event) {
    this.file = null;
  }
}
