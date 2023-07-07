import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeAddRoutingModule } from './practice-add-routing.module';
import { PracticeAddComponent } from './practice-add.component';


@NgModule({
  declarations: [
    PracticeAddComponent
  ],
  imports: [
    CommonModule,
    PracticeAddRoutingModule
  ]
})
export class PracticeAddModule { }
