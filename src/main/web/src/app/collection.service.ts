import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Collection} from "./collection";
import {Project} from "./project";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  baseUrl: string = `http://localhost:8080/projects`;

  getCollections(projectId: number | undefined) {
    if (!projectId) {
      return;
    }
    return this.http.get<Collection[]>(`${this.baseUrl}/${projectId}/collections`);
  }

  getCollection(projectId: number | undefined, collectionId: number) {
    if (!projectId) {
      return;
    }
    return this.http.get<Collection>(`${this.baseUrl}/${projectId}/collections/${collectionId}`);
  }

  addCollection(projectId:number, collection: Collection):  Observable<Collection> {
    return this.http.post<Collection>(`${this.baseUrl}/${projectId}/collections`, collection, {});
  }
}
