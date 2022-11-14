import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FlashCard} from "../flash-card";

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit, OnChanges {
  @Input() card!: FlashCard;

  isFlipped: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  format(text: string) : string {
    return text.split('|').join("\r\n");
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFlipped = false;
  }
}
