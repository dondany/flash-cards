import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../project.service";
import {Project} from "../project";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  project: Project = {name:'', description: ''};

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProject(projectId)
        ?.subscribe(projectRes => {
          this.project = projectRes;
        })
    });
  }

}
