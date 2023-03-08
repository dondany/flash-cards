import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "./project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/projects';

  getProjects() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: number | undefined) {
    if (!id) {
      return;
    }
    return this.http.get<Project>(`${this.baseUrl}/${id}`)
  }
}
