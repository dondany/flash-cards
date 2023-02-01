import { Component, OnInit } from '@angular/core';
import {CollectionListResponse} from "../collection-list-response";
import {CollectionService} from "../collection.service";
import {Collection} from "../collection";

@Component({
  selector: 'app-collections-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {
  collectionListResponse!: CollectionListResponse;
  collections!: Collection[];

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.collectionService.getCollections()
      .subscribe(response => this.init(response));
  }

  private init(response: CollectionListResponse) {
    this.collectionListResponse = response;
    this.collections = response._embedded.collections;
    this.collections = response._embedded.collections;
  }

  favor(collection: Collection) {
    collection.favorite = true;
  }

  disfavor(collection: Collection) {
    collection.favorite = false;
  }
}
