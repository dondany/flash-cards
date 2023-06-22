import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../project-service";
import {ProjectType} from "../types/project-type";
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from "primeng/api";
import {CollectionType} from "../types/collection-type";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {UserType} from "../../../shared/services/user-type";

@Component({
  selector: 'fc-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  project!: ProjectType;
  projectMembers!: UserType[];
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;
  collections!: CollectionType[];

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const projectId = this.activatedRoute.snapshot.params['id'];
    this.projectService.getProject(projectId)
      .pipe(takeUntil(this.destroy),
        tap((project) => {
          this.project = project;
          this.projectMembers = project.members.slice(0,4);
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '/projects'},
            {label: this.project?.name, routerLink: `/projects/${projectId}`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};
        }),
        switchMap(() => this.projectService.getCollections(projectId)),
        tap((collections) => {
          this.collections = collections;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
