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

  baseUrl: string = `http://localhost:8080/projects`;

  getFlashCards(projectId: number, collectionId: number, page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<FlashCard[]>(`${this.baseUrl}/${projectId}/collections/${collectionId}/flash-cards`, { params: params, observe: 'response' });
  }

  getFlashCardsByLink(link: Link) {
    console.log(link.href);
    return this.http.get<FlashCard[]>(link.href, {observe: 'response'});
  }

  addNewFlashCard(flashCard: FlashCard, projectId: number | undefined, collectionId: number | undefined): Observable<FlashCard> {
    return this.http.post<FlashCard>(`${this.baseUrl}/${projectId}/collections/${collectionId}/flash-cards`, flashCard, {});
  }

  updateFlashCard(flashCard: FlashCard, projectId: number | undefined, collectionId: number | undefined): Observable<FlashCard> {
    return this.http.put<FlashCard>(`${this.baseUrl}/${projectId}/collections/${collectionId}/flash-cards/${flashCard.id}`, flashCard, {});
  }

  deleteFlashCard(id: number | undefined, projectId: number | undefined, collectionId: number | undefined): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${projectId}/collections/${collectionId}/flash-cards/${id}`, {});
  }

}
