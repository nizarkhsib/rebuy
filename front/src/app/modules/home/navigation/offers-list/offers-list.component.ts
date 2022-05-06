import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/shared/models/offer';
import { OffersService } from 'src/app/shared/services/offers.service';
import { PaginatedResult } from 'src/app/shared/services/paginated-result';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  skip = 0; // how many elements to skip
  pageSize = 4; // page size
  count = 0; // all offers number
  offers: Offer[] = [];

  isReadMore = true;
  constructor(
    private offersBackendService: OffersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOffersList();
  }

  onPageChange(event) {
    this.pageSize = event.pageSize;
    if (event.previousPageIndex < event.pageIndex)
      this.skip = this.skip + this.pageSize;
    else if (event.previousPageIndex > event.pageIndex) {
      this.skip = this.skip - this.pageSize;
    }
    this.fetchOffersList();
  }

  fetchOffersList() {
    this.offersBackendService
      .getPaginatedList(this.pageSize, this.skip)
      .subscribe(
        (res: PaginatedResult<Offer>) => {
          this.offers = res.results;
          this.count = res.count;
        }
      );
  }

  viewDetails(offer: Offer) {
    this.router.navigate([offer._id], { state: { offer: offer } });
  }

}
