import {Component, Input, OnInit} from '@angular/core';
import {Collection} from "../../collection";

@Component({
  selector: 'app-edit-collection-modal',
  templateUrl: './edit-collection-modal.component.html',
  styleUrls: ['./edit-collection-modal.component.css']
})
export class EditCollectionModalComponent implements OnInit {
  @Input() show: any = false;
  @Input() closeCallback = () => (false);
  @Input() inputCollection!: Collection;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeCallback();
  }
}
