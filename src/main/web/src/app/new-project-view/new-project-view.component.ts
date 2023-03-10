import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {Project} from "../project";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-new-project-view',
  templateUrl: './new-project-view.component.html',
  styleUrls: ['./new-project-view.component.css']
})
export class NewProjectViewComponent implements OnInit {

  form: FormGroup;

  constructor(private _location: Location,
              private fb: FormBuilder,
              private projectService: ProjectService) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const project: Project = {name: this.form.value.name, description: this.form.value.description};
    this.projectService.addProject(project)
      .subscribe(newProject => {
        this._location.back();
      });
  }

}
