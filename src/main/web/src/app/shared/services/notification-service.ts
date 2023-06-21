import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationType} from "../types/notification-type";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {
  }

  getNotifications(): Observable<NotificationType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<NotificationType[]>('/api/notifications', { headers });
  }

  readNotification(id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`/api/notifications/${id}/read`, {}, { headers });
  }

  deleteNotification(id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(`/api/notifications/${id}`, { headers });
  }

}
