import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Offer } from 'src/app/shared/models/offer';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {
  offer: Offer;

  constructor(
    private router: Router,
    private offersService: OffersService,
    private route: ActivatedRoute) {

    const offerFromState = this.router.getCurrentNavigation()?.extras?.state?.offer;

    if (offerFromState) {
      this.offer = offerFromState;
    } else {

      this.route.params
        .pipe(
          switchMap((params) => {
            return this.offersService.get(params.id)
          })
        ).subscribe(
          (offer) => this.offer = offer,
          (error) => {
            this.router.navigate(['']);
          }
        );
    }
  }

}
