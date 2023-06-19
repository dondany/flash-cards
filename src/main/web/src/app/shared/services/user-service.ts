import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserType} from "./user-type";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAuthenticatedUser(): Observable<UserType> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<UserType>('/api/users', {headers});
  }

  getUsersByFirstname(firstname: string): Observable<UserType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const params = new HttpParams().set("firstname", firstname);
    return this.http.get<UserType[]>('/api/users', { params, headers});
  }
}
