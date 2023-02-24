import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlashCard} from "../../flash-card";

@Component({
  selector: 'app-fc-card',
  templateUrl: './fc-card.component.html',
  styleUrls: ['./fc-card.component.css']
})
export class FcCardComponent implements OnInit {
  @Input() card!: FlashCard;

  @Output() selectEvent = new EventEmitter();
  @Output() editFlashCardEvent = new EventEmitter();
  @Output() deleteFlashCardEvent = new EventEmitter();

  isSelected: boolean = false;
  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  select() {
    console.log('sleece')
    this.isSelected = !this.isSelected;
    this.selectEvent.emit(this.card);
  }

  toggleMenu(e: Event) {
    e.stopPropagation();
    this.isMenuOpened = !this.isMenuOpened;
  }

  editFlashCard() {
    this.editFlashCardEvent.emit(this.card);
  }

  deleteFlashCard() {
    this.deleteFlashCardEvent.emit(this.card);
  }

  closeContextMenu() {
    this.isMenuOpened = false;
  }
}
