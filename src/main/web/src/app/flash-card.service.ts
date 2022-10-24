import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  constructor(private http: HttpClient) { }

  getFlashCards() {
    return this.http.get<{front: string; back: string}[]>('http://localhost:8080/flash-cards');
  }
}
