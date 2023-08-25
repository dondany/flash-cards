import {Component, Input} from '@angular/core';
import {FlashCardType} from "../../../../../project/types/flash-card-type";
import {PracticeService} from "../../../../../../shared/services/practice-service";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";

type Question = {
  flashCard: FlashCardType,
  options: string[],
  correctOption: number,
  userAnswer: number | null
}

@Component({
  selector: 'fc-quiz-practice',
  templateUrl: './quiz-practice.component.html',
  styleUrls: ['./quiz-practice.component.scss']
})
export class QuizPracticeComponent {
  @Input() practiceId!: number;

  flashCards!: FlashCardType[];
  currentIndex: number = 0;

  wrongAnswers: boolean[] = [false, false, false, false];
  correctAnswers: boolean[] = [false, false, false, false];

  questions: Question[] = [];
  showScore: boolean = false;
  canBePlayed: boolean = false;

  constructor(private practiceService: PracticeService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.practiceService.getFlashCards(this.practiceId)
      .subscribe((flashCards) => {
        if (flashCards.length < 4) {
          this.canBePlayed = false;
          this.notEnoughFlashCards();
          return;
        }
        this.flashCards = this.shuffle(flashCards);
        this.currentIndex = 0;
        this.initQuiz();
        this.initQuizItem();
        this.canBePlayed = true;
      });
  }

  get isFirst() {
    return this.currentIndex === 0;
  }

  get isLast() {
    return this.currentIndex + 1 === this.flashCards.length;
  }

  get isNotAnswered() {
    return this.questions[this.currentIndex].userAnswer === null;
  }

  get currentFlashCard() {
    return this.flashCards[this.currentIndex];
  }

  get option1() {
    return this.questions[this.currentIndex].options[0];
  }

  get option2() {
    return this.questions[this.currentIndex].options[1];
  }

  get option3() {
    return this.questions[this.currentIndex].options[2];
  }

  get option4() {
    return this.questions[this.currentIndex].options[3];
  }

  next() {
    if (!this.isLast) {
      this.currentIndex++;
      this.initQuizItem();
    }
  }

  previous() {
    if (!this.isFirst) {
      this.currentIndex--;
      this.initQuizItem();
    }
  }

  pick(index: number) {
    if (this.questions[this.currentIndex].userAnswer !== null) {
      return;
    }

    this.questions[this.currentIndex].userAnswer = index;

    if (this.questions[this.currentIndex].options[index] === this.currentFlashCard.back) {
      this.correctAnswers[index] = true;
    } else {
      this.wrongAnswers[index] = true;
    }

    if (this.currentIndex === this.questions.length-1) {
      this.showScore = true;
    }
  }

  initQuiz() {
    for (let i = 0; i < this.flashCards.length; i++) {
      let options = [this.flashCards[i].back];
      let fcs = [...this.flashCards];
      fcs.splice(i, 1);
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * fcs.length);
        options.push(fcs[random].back);
        fcs.splice(random, 1);
      }
      this.shuffle(options);

      const question: Question = {
        flashCard: this.flashCards[i],
        options: options,
        correctOption: options.indexOf(this.flashCards[i].back),
        userAnswer: null
      };

      this.questions.push(question);
      this.showScore = false;
    }
  }

  initQuizItem() {
    this.wrongAnswers = [false, false, false, false];
    this.correctAnswers = [false, false, false, false];

    if (this.questions[this.currentIndex].userAnswer) {
      const index = this.questions[this.currentIndex].userAnswer;
      if (this.questions[this.currentIndex].options[index!] === this.currentFlashCard.back) {
        this.correctAnswers[index!] = true;
      } else {
        this.wrongAnswers[index!] = true;
      }
    }
  }

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  score(): string {
    return `${this.questions.filter(q => q.options[q.userAnswer!] === q.flashCard.back).length}/${this.questions.length}`;
  }

  notEnoughFlashCards() {
    this.confirmationService.confirm({
      message: 'You need at least 4 flash cards to play this Quiz',
      header: 'Warning',
      acceptLabel: 'Ok',
      rejectVisible: false,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/home/practice'])
      }
    })
  }
}
