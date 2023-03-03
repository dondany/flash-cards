import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Collection} from "../../collection";

@Component({
  selector: 'app-collection-context-menu',
  templateUrl: './collection-context-menu.component.html',
  styleUrls: ['./collection-context-menu.component.css']
})
export class CollectionContextMenuComponent implements OnInit {
  @Input() collection!: Collection;

  @Output() editCollectionMenuEvent = new EventEmitter<Collection>();
  @Output() deleteCollectionMenuEvent = new EventEmitter<Collection>();
  @Output() closeCollectionMenuEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  edit($event: MouseEvent) {
    $event.stopPropagation();
    this.editCollectionMenuEvent.emit(this.collection);
    this.close($event);
  }

  delete($event: MouseEvent) {
    $event.stopPropagation();
    this.deleteCollectionMenuEvent.emit(this.collection);
    this.close($event);
  }

  close($event: any) {
    this.closeCollectionMenuEvent.emit();
  }
}
