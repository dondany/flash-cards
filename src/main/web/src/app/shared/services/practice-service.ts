import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PracticeType} from "../types/practice-type";
import {FlashCardType} from "../../pages/project/types/flash-card-type";

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  constructor(private http: HttpClient) {}

  getPractices(): Observable<PracticeType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<PracticeType[]>('/api/practices', {headers});
  }

  getFlashCards(id: number): Observable<FlashCardType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<FlashCardType[]>(`/api/practices/${id}/flash-cards`, {headers});
  }
}