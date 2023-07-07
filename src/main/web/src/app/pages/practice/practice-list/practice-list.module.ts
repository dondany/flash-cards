import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeListRoutingModule } from './practice-list-routing.module';
import { PracticeListComponent } from './practice-list.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";


@NgModule({
  declarations: [
    PracticeListComponent
  ],
  imports: [
    CommonModule,
    PracticeListRoutingModule,
    BreadcrumbModule,
    ButtonModule,
    DataViewModule,
    CardModule,
    AvatarModule
  ]
})
export class PracticeListModule { }
