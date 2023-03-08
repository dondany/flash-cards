import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Collection} from "../../collection";
import {Project} from "../project";

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
  @Input() collection!: Collection;
  @Input() project!: Project;

  @Output() editCollectionMenuEvent = new EventEmitter<Collection>();
  @Output() deleteCollectionMenuEvent = new EventEmitter<Collection>();

  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  editCollection() {
    this.editCollectionMenuEvent.emit(this.collection);
  }

  deleteCollection() {
    this.deleteCollectionMenuEvent.emit(this.collection);
  }

  closeContextMenu() {
    this.isMenuOpened = false;
  }
}
