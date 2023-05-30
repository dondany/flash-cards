import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectListComponent } from './project-list.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ProjectListComponent
  ],
    imports: [
        CommonModule,
        ProjectListRoutingModule,
        MatCardModule
    ]
})
export class ProjectListModule { }
