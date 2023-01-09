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

  constructor(private flashCardService: FlashCardService) { };

  ngOnInit(): void {
    this.flashCardService.getFlashCards()
      .subscribe(flashCards => this.flashCards = flashCards);
  }

}
