import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-project-settings-view',
  templateUrl: './project-settings-view.component.html',
  styleUrls: ['./project-settings-view.component.css']
})
export class ProjectSettingsViewComponent implements OnInit {
  project!: Project | undefined;
  showConfirmDeleteModal: boolean = false;
  header: string = 'Warning!'
  confirmMessage: string = `Are you sure You want to delete this project?`;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private _router: Router,
              private projectService: ProjectService) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProject(projectId)
        ?.subscribe(projectRes => {
          this.project = projectRes;
          this.form = this.fb.group({
            name: [projectRes.name],
            description: [projectRes.description]
          })
        })
    });
  }

  onSubmit() {

  }

  deleteProject = () => {
    this.projectService.deleteProject(this.project?.id).subscribe(res => {
      console.log(res);
      this._router.navigate(['/projects']);
      return true;
    })
    return true;
  }

  showDeleteModal() {
    this.showConfirmDeleteModal = true;
  }

  closeDeleteMOdal= () => {
    return this.showConfirmDeleteModal = false;
  }

}
