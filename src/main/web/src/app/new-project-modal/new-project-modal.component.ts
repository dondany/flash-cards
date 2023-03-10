import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjectService} from "../project.service";
import {Project} from "../project";

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  @Input() show: any = false;
  @Input() closeCallback = () => (false);

  @Output() newProjectEvent = new EventEmitter<Project>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    const project: Project = {name: this.form.value.name, description: this.form.value.description};
    this.projectService.addProject(project)
      .subscribe(newProject => this.newProjectEvent.emit(newProject));

  }

  close() {
    this.closeCallback();
  }

}
