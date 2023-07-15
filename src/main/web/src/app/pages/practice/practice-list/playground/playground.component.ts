import {Component, Input, OnInit} from '@angular/core';
import {PracticeService} from "../../../../shared/services/practice-service";

@Component({
  selector: 'fc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  @Input() id!: number;

  constructor(private practiceService: PracticeService) {
  }

  get practiceId() {
    return this.id;
  }

  ngOnInit(): void {
  }
}
