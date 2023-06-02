import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";


@NgModule({
  declarations: [
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    BreadcrumbModule,
    CardModule,
    AvatarModule,
    ButtonModule,
    DataViewModule
  ]
})
export class ProjectDetailsModule { }
