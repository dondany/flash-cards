import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../project";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project!: Project | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
