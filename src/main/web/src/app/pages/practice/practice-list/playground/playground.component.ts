import {Component, OnInit} from '@angular/core';
import {PracticeService} from "../../../../shared/services/practice-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(private practiceService: PracticeService,
              private activatedRoute: ActivatedRoute) {
  }

  get practiceId() {
    return this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }
}
