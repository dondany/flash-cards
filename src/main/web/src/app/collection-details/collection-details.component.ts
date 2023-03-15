import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Collection} from "../../collection";
import {Router} from "@angular/router";
import {Project} from "../project";

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {
  @Input() collection!: Collection | undefined;
  @Input() project!: Project | undefined;

  @Output() editCollectionMenuEvent = new EventEmitter<Collection>();
  @Output() deleteCollectionMenuEvent = new EventEmitter<Collection>();

  isMenuOpened: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  url() {
    return this.router.url;
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
