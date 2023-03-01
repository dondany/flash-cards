import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpParams} from "@angular/common/http";
import {FlashCard} from "./flash-card";
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
    return this.http.get<FlashCard[]>(this.baseUrl, { params: params, observe: 'response' });
  }

  getFlashCardsByLink(link: Link) {
    console.log(link.href);
    return this.http.get<FlashCard[]>(link.href, {observe: 'response'});
  }

  addNewFlashCard(flashCard: FlashCard): Observable<FlashCard> {
    return this.http.post<FlashCard>(this.baseUrl, flashCard, {});
  }

  updateFlashCard(flashCard: FlashCard): Observable<FlashCard> {
    return this.http.put<FlashCard>(this.baseUrl + `/${flashCard.id}`, flashCard, {});
  }

  deleteFlashCard(id: number | undefined): Observable<any>{
    return this.http.delete(this.baseUrl + `/${id}`, {});
  }

}
