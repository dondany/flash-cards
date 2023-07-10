import {Component, Input} from '@angular/core';
import {FlashCardType} from "../../../../../project/types/flash-card-type";
import {PracticeService} from "../../../../../../shared/services/practice-service";

@Component({
  selector: 'fc-quiz-practice',
  templateUrl: './quiz-practice.component.html',
  styleUrls: ['./quiz-practice.component.scss']
})
export class QuizPracticeComponent {
  @Input() practiceId!: number;

  flashCards!: FlashCardType[];
  currentIndex: number = 0;

  answers: string[] = ['', '', '', ''];
  wrongAnswers: boolean[] = [false, false, false, false];
  correctAnswers: boolean[] = [false, false, false, false];

  constructor(private practiceService: PracticeService) {
  }

  ngOnInit(): void {
    this.practiceService.getFlashCards(this.practiceId)
      .subscribe((flashCards) => {
        this.flashCards = this.shuffle(flashCards);
        this.currentIndex = 0;
        this.initQuizItem();
      })
  }

  get isFirst() {
    return this.currentIndex === 0;
  }

  get isLast() {
    return this.currentIndex + 1 === this.flashCards.length;
  }

  get currentFlashCard() {
    return this.flashCards[this.currentIndex];
  }

  get answer1() {
    return this.answers[0];
  }

  get answer2() {
    return this.answers[1];
  }

  get answer3() {
    return this.answers[2];
  }

  get answer4() {
    return this.answers[3];
  }

  next() {
    if (!this.isLast) {
      this.currentIndex++;
      this.initQuizItem();
    }
  }

  pick(index: number) {
    if (this.answers[index] === this.currentFlashCard.back) {
      this.correctAnswers[index] = true;
    } else {
      this.wrongAnswers[index] = true;
    }
  }

  initQuizItem() {
    this.wrongAnswers = [false, false, false, false];
    this.correctAnswers = [false, false, false, false];
    this.answers = [];
    this.answers.push(this.flashCards[this.currentIndex].back);
    let fcs = [...this.flashCards];
    fcs.splice(0, 1);
    for(let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * fcs.length);
      this.answers.push(fcs[random].back);
      fcs.splice(random, 1);
    }
    this.shuffle(this.answers);
  }

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
