import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectType} from "./types/project-type";
import {CollectionType} from "./types/collection-type";
import {FlashCardType} from "./types/flash-card-type";
import {AddProjectType} from "./project-add/types/add-project-type";
import {AddProjectFormValueType} from "./project-add/types/add-project-form-group-type";
import {ProjectSettingsValueType} from "./project-details/project-settings/types/project-settings-form-group-type";
import {FlashCardNewValueType} from "./project-details/collection/types/flash-card-new-form-group-type";
import {FlashCardUpdateValueType} from "./project-details/collection/types/flash-card-update-form-group-type";
import {CollectionAddFormValueType} from "./project-details/collection-add/types/collection-add-form-group-type";
import {
  CollectionSettingsValueType
} from "./project-details/collection/collection-settings/types/collection-settings-form-group-type";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<ProjectType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<ProjectType[]>('/api/projects', {headers});
  }

  getProject(id: number): Observable<ProjectType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<ProjectType>(`/api/projects/${id}`, {headers});
  }

  createProject(project: AddProjectFormValueType): Observable<ProjectType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<ProjectType>(`/api/projects`, project, {headers});
  }

  updateProject(id: number, projectSettings: ProjectSettingsValueType): Observable<ProjectType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch<ProjectType>(`/api/projects/${id}`, projectSettings, {headers});
  }

  deleteProject(id: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(`/api/projects/${id}`, {headers});
  }

  getCollections(id: number): Observable<CollectionType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<CollectionType[]>(`/api/projects/${id}/collections`, {headers});
  }

  getCollection(projectId: number, id: number): Observable<CollectionType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<CollectionType>(`/api/projects/${projectId}/collections/${id}`, {headers});
  }

  createCollection(projectId: number, collection: CollectionAddFormValueType): Observable<CollectionType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<CollectionType>(`/api/projects/${projectId}/collections`, collection,{headers});
  }

  updateCollection(projectId: any, collectionId: any, collection: CollectionSettingsValueType) : Observable<CollectionType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch<CollectionType>(`/api/projects/${projectId}/collections/${collectionId}`, collection,{headers});
  }

  deleteCollection(projectId: number, collectionId: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(`/api/projects/${projectId}/collections/${collectionId}`, {headers});
  }

  getFlashCards(projectId: number, collectionId: number): Observable<FlashCardType[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('page', 0).set('size', 30)
    return this.http.get<FlashCardType[]>(`/api/projects/${projectId}/collections/${collectionId}/flash-cards`, {
      params,
      headers
    });
  }

  createFlashCard(projectId: number, collectionId: number, fc: FlashCardNewValueType): Observable<FlashCardType> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<FlashCardType>(`/api/projects/${projectId}/collections/${collectionId}/flash-cards`, fc, {headers});
  }

  updateFlashCard(projectId: number, collectionId: number, id: number, fc: FlashCardUpdateValueType) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put(`/api/projects/${projectId}/collections/${collectionId}/flash-cards/${id}`, fc, {headers});
  }

  deleteFlashCard(projectId: number, collectionId: number, id: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(`/api/projects/${projectId}/collections/${collectionId}/flash-cards/${id}`, {headers});
  }

  private getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }
}
