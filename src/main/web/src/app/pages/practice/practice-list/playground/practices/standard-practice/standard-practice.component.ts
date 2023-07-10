import {Component, Input, OnInit} from '@angular/core';
import {FlashCardType} from "../../../../../project/types/flash-card-type";
import {PracticeService} from "../../../../../../shared/services/practice-service";

@Component({
  selector: 'fc-standard-practice',
  templateUrl: './standard-practice.component.html',
  styleUrls: ['./standard-practice.component.scss']
})
export class StandardPracticeComponent implements OnInit {
  @Input() practiceId!: number;

  flashCards!: FlashCardType[];
  currentIndex = 0;
  isFlipped: boolean = false;

  constructor(private practiceService: PracticeService) {
  }

  ngOnInit(): void {
    this.practiceService.getFlashCards(this.practiceId)
      .subscribe((flashCards) => {
        this.flashCards = this.shuffle(flashCards);
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
