import { Injectable } from '@angular/core';
import {catchError, throwError} from "rxjs";

import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FlashCard} from "./flash-card";

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  constructor(private http: HttpClient) { }

  getFlashCards() {
    return this.http.get<FlashCard[]>('http://localhost:8080/flash-cards');
  }

  addNewFlashCard(flashCard: FlashCard) {
    this.http.post<FlashCard>('http://localhost:8080/flash-cards', flashCard, {})
      .subscribe(data => console.log(data));
  }

}
