import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectType} from "./types/project-type";
import {CollectionType} from "./types/collection-type";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<ProjectType[]>('/api/projects',{headers});
  }

  getProject(id: number): Observable<ProjectType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<ProjectType>(`/api/projects/${id}`,{headers});
  }

  getCollections(id: number): Observable<CollectionType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<CollectionType[]>(`/api/projects/${id}/collections`,{headers});
  }

  getCollection(projectId: number, id: number): Observable<CollectionType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<CollectionType>(`/api/projects/${projectId}/collections/${id}`,{headers});
  }

  private getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }


}
