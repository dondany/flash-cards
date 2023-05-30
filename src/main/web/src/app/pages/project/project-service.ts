import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectType} from "./types/project-type";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectType[]> {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<ProjectType[]>('/api/projects',{headers});
  }

}
