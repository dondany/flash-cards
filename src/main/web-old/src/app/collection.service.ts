import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CollectionListResponse} from "./collection-list-response";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/projects/1/collections/';

  getCollections() {
    return this.http.get<CollectionListResponse>(this.baseUrl);
  }

}
