import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";

import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {FlashCard} from "./flash-card";

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/flash-cards';

  getFlashCards() {
    return this.http.get<FlashCard[]>(this.baseUrl);
  }

  addNewFlashCard(flashCard: FlashCard): Observable<FlashCard> {
    return this.http.post<FlashCard>(this.baseUrl, flashCard, {});
  }

  deleteFlashCard(id: number) {
    console.log()
    this.http.delete(this.baseUrl + `/${id}`, {}).subscribe();
  }

}
