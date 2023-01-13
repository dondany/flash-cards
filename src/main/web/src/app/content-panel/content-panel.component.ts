import { Component, OnInit } from '@angular/core';
import {FlashCard} from "../flash-card";
import {FlashCardService} from "../flash-card.service";

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit {
  flashCards!: FlashCard[];
  showModal: boolean = false;

  constructor(private flashCardService: FlashCardService) { };

  ngOnInit(): void {
    this.flashCardService.getFlashCards()
      .subscribe(flashCards => this.flashCards = flashCards);
  }

  addNewFlashCard(flashCard: FlashCard) {
    this.flashCards.push(flashCard);
    this.showModal = false;
  }

  addNextFlashCard(flashCard: FlashCard) {
    this.flashCards.push(flashCard);
  }

  openModal = () => {
    return this.showModal = true;
  }

  closeModal = () => {
    return this.showModal = false;
  }

  deleteFlashCard(id: number) {
    this.flashCardService.deleteFlashCard(id);
    this.flashCards = this.flashCards.filter(fc => fc.id !== id);
  }
}
