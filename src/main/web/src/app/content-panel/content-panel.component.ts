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

  toggleModal = () => {
    return this.showModal= !this.showModal;
  }

  addNewFlashCard(flashCard: FlashCard) {
    this.flashCards.push(flashCard);
    this.showModal = false;
  }

  addNextFlashCard(flashCard: FlashCard) {
    this.flashCards.push(flashCard);
  }
}
