import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import { StandardPracticeComponent } from './practices/standard-practice/standard-practice.component';
import { QuizPracticeComponent } from './practices/quiz-practice/quiz-practice.component';


@NgModule({
  declarations: [
    PlaygroundComponent,
    StandardPracticeComponent,
    QuizPracticeComponent
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class PlaygroundModule { }
