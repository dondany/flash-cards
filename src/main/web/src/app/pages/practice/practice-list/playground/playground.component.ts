import {Component, OnInit} from '@angular/core';
import {PracticeService} from "../../../../shared/services/practice-service";
import {FlashCardType} from "../../../project/types/flash-card-type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  flashCards!: FlashCardType[];
  currentIndex = 0;
  isFlipped: boolean = false;

  constructor(private practiceService: PracticeService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const practiceId = this.activatedRoute.snapshot.params['id'];
    this.practiceService.getFlashCards(practiceId)
      .subscribe((flashCards) => {
        this.flashCards = this.shuffle(flashCards);
        this.currentIndex = 0;
      })
  }

  get currentFlashCard() {
    return this.flashCards[this.currentIndex];
  }

  get isFirst() {
    return this.currentIndex === 0;
  }

  get isLast() {
    return this.currentIndex + 1 === this.flashCards.length;
  }

  prev() {
    if (!this.isFirst) {
      this.currentIndex--;
      this.isFlipped = false;
    }
  }

  next() {
    if (!this.isLast) {
      this.currentIndex++;
      this.isFlipped = false;
    }
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  shuffle(array: FlashCardType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
