import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Offer } from "../models/offer";
import { ResourceService } from "./backend.service";
import { PaginatedResult } from "./paginated-result";

@Injectable({
  providedIn: 'root'
})
export class OffersService extends ResourceService<Offer>{
  private readonly API = environment.apiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'offers';
  }

  postWithPhoto(resource: Offer, file: File): Observable<Offer> {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(resource).forEach(key => {
      formData.append(key, resource[key]);
    });
    return this.httpClient.post(`${this.API}/with-photo`, formData);
  }

  getPaginatedList(pageSize: number, skip: number): Observable<PaginatedResult<Offer>> {
    let params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('skip', skip.toString());

    return this.httpClient
      .get<PaginatedResult<Offer>>(`${this.API}?${params.toString().trim()}`).pipe(
        map(paginatedResult => {
          paginatedResult.results
            .forEach(
              offer => offer.filePath = `${environment.apiUrl}${offer.filePath}`
            );
          return paginatedResult;
        })
      )
  }

  likeOffer(userId, offerId) {
    const body = {
      userId,
      offerId
    }
    return this.httpClient.post<any>(`${this.API}/like`, body);
  }

  dislikeOffer(userId, offerId) {
    const body = {
      userId,
      offerId
    }
    return this.httpClient.post<any>(`${this.API}/dislike`, body);
  }

  get(id: string | number): Observable<Offer> {
    return this.httpClient.get<Offer>(`${this.API}/${id}`)
      .pipe(
        map((offer: Offer) => {
          offer.filePath = `${environment.apiUrl}${offer.filePath}`
          return offer;
        })
      );
  }

}