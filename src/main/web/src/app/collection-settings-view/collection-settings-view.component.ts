import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {CollectionService} from "../collection.service";
import {Collection} from "../collection";
import {Project} from "../project";

@Component({
  selector: 'app-collection-settings-view',
  templateUrl: './collection-settings-view.component.html',
  styleUrls: ['./collection-settings-view.component.css']
})
export class CollectionSettingsViewComponent implements OnInit {
  collection: Collection | undefined;
  project: Project | undefined;
  showConfirmDeleteModal: boolean = false;
  header: string = 'Warning!'
  confirmMessage: string = `Are you sure You want to delete this collection?`;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private _router: Router,
              private projectService: ProjectService,
              private collectionService: CollectionService) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      this.projectService.getProject(projectId)
        ?.subscribe(projectRes => {
          this.project = projectRes;
        })
      const collectionId = params['collectionId'];
      this.collectionService.getCollection(projectId, collectionId)
        ?.subscribe(collectionRes => {
          this.collection = collectionRes;
          this.form = this.fb.group({
            name: [collectionRes.name],
            description: [collectionRes.description]
          })
        })

    });
  }

  onSubmit() {
    if (!this.project || !this.project.id || !this.collection || !this.collection.id) {
      return;
    }
    let updateCollection = ({name: this.form.value.name, description: this.form.value.description});
    this.collectionService.updateCollection(updateCollection, this.project.id, this.collection.id).subscribe(res => {
      this.collection = res;
      if (this.project) {
        this._router.navigate(['/projects', this.project.id, 'collections', this.collection.id]);
      }
    })
  }

  deleteCollection = () => {
    console.log("1")
    if (!this.project || !this.project.id || !this.collection || !this.collection.id) {
      return false;
    }
    console.log("2")
    this.collectionService.deleteCollection(this.project.id, this.collection.id).subscribe(res => {
      if (this.project) {
        this._router.navigate(['/projects', this.project.id]);
      }
      return true;
    })
    return true;
  }

  showDeleteModal() {
    this.showConfirmDeleteModal = true;
  }

  closeDeleteModal = () => {
    return this.showConfirmDeleteModal = false;
  }

}
