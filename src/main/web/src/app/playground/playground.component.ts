import {Component, OnInit} from '@angular/core';
import {FlashCardService} from "../flash-card.service";
import {FlashCard} from "../flash-card";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  flashCards!: FlashCard[];
  currentFlashCardIndex: number = 0;

  constructor(private flashCardService: FlashCardService) {
  };

  ngOnInit(): void {
    this.flashCardService.getFlashCards()
      .subscribe(flashCards => {
        this.flashCards = flashCards as FlashCard[]
      });
  }

  previousCard() {
    this.currentFlashCardIndex = this.currentFlashCardIndex > 0 ? this.currentFlashCardIndex - 1 : this.flashCards.length - 1;
  }

  nextCard() {
    this.currentFlashCardIndex = this.currentFlashCardIndex == this.flashCards.length - 1 ? 0 : this.currentFlashCardIndex + 1;
  }
}
