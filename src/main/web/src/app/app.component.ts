import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FlashCardService} from "./flash-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  flashCards!: Observable<{ front: string, back: string }[]>;

  constructor(private flashCardService: FlashCardService) {};

  ngOnInit(): void {
    this.flashCards = this.flashCardService.getFlashCards();
    console.log(this.flashCards);
  }

}
