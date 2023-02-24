import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpParams} from "@angular/common/http";
import {FlashCard} from "./flash-card";
import {FlashCardListResponse} from "./flash-card-response";
import {Link} from "./link";

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/projects/1/collections/2/flash-cards';

  getFlashCards(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<FlashCardListResponse>(this.baseUrl, { params: params });
  }

  getFlashCardsByLink(link: Link) {
    return this.http.get<FlashCardListResponse>(link.href);
  }

  addNewFlashCard(flashCard: FlashCard): Observable<FlashCard> {
    return this.http.post<FlashCard>(this.baseUrl, flashCard, {});
  }

  deleteFlashCard(id: number) {
    console.log()
    this.http.delete(this.baseUrl + `/${id}`, {}).subscribe();
  }

}
