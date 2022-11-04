import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FlashCardService} from "./flash-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  flashCards!: {front: string, back: string}[];
  currentFlashCardIndex: number = 0;

  constructor(private flashCardService: FlashCardService) {};

  ngOnInit(): void {
    this.flashCardService.getFlashCards()
      .subscribe(flashCards => {this.flashCards = flashCards as {front: string, back: string}[]});
  }

  previousCard() {
    this.currentFlashCardIndex = this.currentFlashCardIndex > 0 ? this.currentFlashCardIndex - 1 : this.flashCards.length - 1;
  }

  nextCard() {
    this.currentFlashCardIndex = this.currentFlashCardIndex == this.flashCards.length-1 ? 0 : this.currentFlashCardIndex + 1;
  }
}
