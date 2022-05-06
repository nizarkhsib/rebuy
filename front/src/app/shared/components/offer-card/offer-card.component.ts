import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggedUserDto } from '../../models/logged-user-dto';
import { Offer } from '../../models/offer';
import { AuthenticationService } from '../../services/authentication.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Output() viewDetails = new EventEmitter();
  isReadMore = true;
  isCommentInputHidden = true;
  isLogged = false;
  loggedUser: LoggedUserDto;

  constructor(
    private authenticationService: AuthenticationService,
    private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.loggedUser = this.authenticationService.currentUserSubject.getValue();
    this.loggedUser ? this.isLogged = true : this.isLogged = false;
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }

  likeOffer() {
    this.offersService
      .likeOffer(this.loggedUser._id, this.offer._id)
      .subscribe(
        (updatedOffer: Offer) => {
          this.handleLikeOrDislikeSubscribe(updatedOffer);
        }
      );
  }

  dislikeOffer() {
    this.offersService
      .dislikeOffer(this.loggedUser._id, this.offer._id)
      .subscribe(
        (updatedOffer: Offer) => {
          this.handleLikeOrDislikeSubscribe(updatedOffer);
        }
      );
  }

  hasLikedTheOffer() {
    return this.offer.likedBy.find(id => id === this.loggedUser._id) !== undefined;
  }

  hasdislikedTheOffer() {
    return this.offer.dislikedBy.find(id => id === this.loggedUser._id) !== undefined;
  }

  private handleLikeOrDislikeSubscribe(updatedOffer: Offer) {
    this.offer.likedBy = updatedOffer.likedBy;
    this.offer.likes = updatedOffer.likes;
    this.offer.dislikedBy = updatedOffer.dislikedBy;
    this.offer.dislikes = updatedOffer.dislikes;
  }

  viewDetailsClicked() {
    this.viewDetails.next();
  }

}
