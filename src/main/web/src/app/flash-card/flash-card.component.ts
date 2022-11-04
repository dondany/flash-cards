import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit, OnChanges {
  @Input() front!: string;
  @Input() back!: string;

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
