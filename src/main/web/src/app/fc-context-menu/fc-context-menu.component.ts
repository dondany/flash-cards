import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlashCard} from "../../flash-card";

@Component({
  selector: 'app-fc-context-menu',
  templateUrl: './fc-context-menu.component.html',
  styleUrls: ['./fc-context-menu.component.css']
})
export class FcContextMenuComponent implements OnInit {
  @Input() flashCard!: FlashCard;

  @Output() editFlashCardEvent = new EventEmitter<FlashCard>();
  @Output() deleteFlashCardEvent = new EventEmitter<FlashCard>;
  @Output() closeContextMenuEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  edit($event: Event) {
    $event.stopPropagation();
    this.editFlashCardEvent.emit(this.flashCard);
    this.close($event);
  }

  delete($event: Event) {
    $event.stopPropagation();
    this.deleteFlashCardEvent.emit(this.flashCard);
    this.close($event);
  }

  close($event: Event) {
    // $event.stopPropagation();
    this.closeContextMenuEvent.emit();
  }
}
