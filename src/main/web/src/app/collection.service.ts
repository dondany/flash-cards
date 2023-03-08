import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Collection} from "./collection";

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
}
