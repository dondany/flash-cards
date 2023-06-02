import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {ProjectService} from "../../project-service";
import {ActivatedRoute} from "@angular/router";
import {ProjectType} from "../../types/project-type";
import {MenuItem} from "primeng/api";
import {CollectionType} from "../../types/collection-type";

@Component({
  selector: 'fc-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  collection!: CollectionType;
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.params['id'];
    const collectionId = this.activatedRoute.snapshot.params['id'];
    this.projectService.getCollection(projectId, collectionId)
      .pipe(takeUntil(this.destroy),
        tap((collection) => {
          this.collection = collection;
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: collection.projectName, routerLink: `/projects/${projectId}`},
            {label: collection.name, routerLink: `/projects/${projectId}/collections/${collectionId}` }
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/../'};
        }),
        switchMap(() => this.projectService.getCollections(projectId)),
        tap((collections) => {
          //load flashcards here
        })
      )
      .subscribe();
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
