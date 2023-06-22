import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project-service";
import {ProjectType} from "../types/project-type";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'fc-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects?: ProjectType[];
  sharedProjects!: ProjectType[];
  breadCrumbItems?: MenuItem[];
  homeItem?: MenuItem;

  constructor(private projectService: ProjectService, private router: Router) {
  }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
    this.projectService.getSharedProjects()
      .subscribe(projects => {
        this.sharedProjects = projects;
      });

    this.breadCrumbItems = [{ label: 'Projects', routerLink: '/projects'}];
    this.homeItem = { icon: 'pi pi-home', routerLink: '/home'}
  }
}
