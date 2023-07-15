import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../project-service";
import {ProjectType} from "../types/project-type";
import {MenuItem} from "primeng/api";
import {CollectionType} from "../types/collection-type";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {ProjectMemberType} from "../types/project-member-type";

@Component({
  selector: 'fc-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  @Input('id') projectId!: number;

  private destroy = new Subject<void>();
  project!: ProjectType;
  projectMembers!: ProjectMemberType[];
  breadCrumbItems!: MenuItem[];
  homeItem!: MenuItem;
  collections!: CollectionType[];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProject(this.projectId)
      .pipe(takeUntil(this.destroy),
        tap((project) => {
          this.project = project;
          this.projectMembers = project.members.slice(0,4);
          this.breadCrumbItems = [
            {label: 'Projects', routerLink: '..'},
            {label: this.project?.name, routerLink: `.`}
          ];
          this.homeItem = {icon: 'pi pi-home', routerLink: '/home'};
        }),
        switchMap(() => this.projectService.getCollections(this.projectId)),
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
