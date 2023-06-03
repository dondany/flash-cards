import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectType} from "./types/project-type";
import {CollectionType} from "./types/collection-type";
import {FlashCardType} from "./types/flash-card-type";
import {AddProjectType} from "./project-add/types/add-project-type";
import {AddProjectFormValueType} from "./project-add/types/add-project-form-group-type";

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

  createProject(project: AddProjectFormValueType): Observable<ProjectType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<ProjectType>(`/api/projects`, project,{headers});
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

  getFlashCards(projectId: number, collectionId: number): Observable<FlashCardType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('page', 0).set('size', 30)
    return this.http.get<FlashCardType[]>(`/api/projects/${projectId}/collections/${collectionId}/flash-cards`,{params, headers});
  }

  private getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }


}
