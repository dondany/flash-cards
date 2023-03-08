import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Project} from "../project";
import {CollectionService} from "../collection.service";
import {Collection} from "../collection";

@Component({
  selector: 'app-fc-collection-list',
  templateUrl: './fc-collection-list.component.html',
  styleUrls: ['./fc-collection-list.component.css']
})
export class FcCollectionListComponent implements OnInit, OnChanges {
  @Input() project!: Project;

  collections!: Collection[];

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project'] && this.project) {
      this.collectionService.getCollections(this.project.id)
        ?.subscribe(response => {
          this.collections = response;
        })
    }
  }

  openNewCollectionModal() {

  }
}
