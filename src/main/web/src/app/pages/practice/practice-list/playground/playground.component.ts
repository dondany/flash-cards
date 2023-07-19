import {Component, Input, OnInit} from '@angular/core';
import {PracticeService} from "../../../../shared/services/practice-service";
import {PracticeType} from "../../../../shared/types/practice-type";

@Component({
  selector: 'fc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  @Input() id!: number;

  practice!: PracticeType;

  constructor(private practiceService: PracticeService) {
  }

  get practiceId() {
    return this.id;
  }

  get practiceType() {
    return this.practice.type;
  }

  ngOnInit(): void {
    this.practiceService.getPractice(this.id)
      .subscribe((practice) => {
        this.practice = practice;
      });
  }
}
