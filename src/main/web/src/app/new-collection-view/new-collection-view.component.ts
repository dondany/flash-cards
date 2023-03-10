import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {CollectionService} from "../collection.service";
import {Collection} from "../collection";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-collection-view',
  templateUrl: './new-collection-view.component.html',
  styleUrls: ['./new-collection-view.component.css']
})
export class NewCollectionViewComponent implements OnInit {

  form: FormGroup;
  projectId!: number;

  constructor(private _location: Location,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private collectionService: CollectionService) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const collection: Collection = {name: this.form.value.name, description: this.form.value.description};
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      this.collectionService.addCollection(projectId, collection)
        .subscribe(newCollection => {
          this._location.back();
        });
    });

  }
}
