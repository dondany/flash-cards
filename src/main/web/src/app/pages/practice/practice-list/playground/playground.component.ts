import {Component, OnInit} from '@angular/core';
import {PracticeService} from "../../../../shared/services/practice-service";
import {PracticeType} from "../../../../shared/types/practice-type";
import {FlashCardType} from "../../../project/types/flash-card-type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  // practice: PracticeType;
  flashCards!: FlashCardType[];
  currentFlashCard!: FlashCardType;
  isFlipped: boolean = false;

  constructor(private practiceService: PracticeService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const practiceId = this.activatedRoute.snapshot.params['id'];
    this.practiceService.getFlashCards(practiceId)
      .subscribe((flashCards) => {
        this.flashCards = flashCards;
        let random = Math.floor(Math.random() * (flashCards.length))
        this.currentFlashCard = this.flashCards[random];
      })


  }

  next() {
    let random = Math.floor(Math.random() * (this.flashCards.length))
    this.currentFlashCard = this.flashCards[random];
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }
}
