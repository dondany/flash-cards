import {Component, Input, OnInit} from '@angular/core';
import {Collection} from "../collection";
import {ActivatedRoute} from "@angular/router";
import {CollectionService} from "../collection.service";
import {Project} from "../project";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.css']
})
export class CollectionViewComponent implements OnInit {
  @Input() collection: Collection | undefined;

  project: Project | undefined;

  constructor(private collectionService: CollectionService,
              private projectService: ProjectService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      const collectionId = params['collectionId']
      this.collectionService.getCollection(projectId, collectionId)
        ?.subscribe(collectionResponse => {
          this.collection = collectionResponse;
        })
      this.projectService.getProject(projectId)
        ?.subscribe(projectResponse => {
          this.project = projectResponse;
        })
    });
  }

}
