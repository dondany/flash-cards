import {Component, OnInit} from '@angular/core';
import {PracticeService} from "../../../shared/services/practice-service";
import {PracticeType} from "../../../shared/types/practice-type";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'fc-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.scss']
})
export class PracticeListComponent implements OnInit {
  practices!: PracticeType[];

  breadCrumbItems?: MenuItem[];
  homeItem?: MenuItem;

  constructor(private practiceService: PracticeService) {}

  ngOnInit(): void {
    this.practiceService.getPractices()
      .subscribe((practices) => {
        this.practices = practices;
      });

    this.breadCrumbItems = [{ label: 'Practices', routerLink: '.'}];
    this.homeItem = { icon: 'pi pi-home', routerLink: '/home'}
  }

}
