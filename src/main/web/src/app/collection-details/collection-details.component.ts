import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Collection} from "../../collection";

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {
  @Input() collection!: Collection | undefined;

  @Output() editCollectionMenuEvent = new EventEmitter<Collection>();
  @Output() deleteCollectionMenuEvent = new EventEmitter<Collection>();

  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(e: Event) {
    e.stopPropagation();
    this.isMenuOpened = !this.isMenuOpened;
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
