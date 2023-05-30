import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project-service";
import {ProjectType} from "../types/project-type";

@Component({
  selector: 'fc-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects?: ProjectType[];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
  }

}
