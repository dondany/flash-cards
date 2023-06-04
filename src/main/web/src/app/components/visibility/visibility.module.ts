import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityComponent } from './visibility.component';



@NgModule({
  declarations: [
    VisibilityComponent
  ],
  exports: [
    VisibilityComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VisibilityModule { }
