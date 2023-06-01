import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectListComponent } from './project-list.component';
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    DataViewModule,
    ButtonModule,
  ]
})
export class ProjectListModule { }
