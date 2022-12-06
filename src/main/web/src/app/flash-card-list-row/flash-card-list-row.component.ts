import {Component, Input, OnInit} from '@angular/core';
import {FlashCard} from "../flash-card";

@Component({
  selector: '[app-flash-card-list-row]',
  templateUrl: './flash-card-list-row.component.html',
  styleUrls: ['./flash-card-list-row.component.css']
})
export class FlashCardListRowComponent implements OnInit {
  @Input() index!: number;
  @Input() flashCard!: FlashCard;
  @Input() currentAction!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
