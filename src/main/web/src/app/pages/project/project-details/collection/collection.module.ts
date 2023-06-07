import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CollectionRoutingModule} from './collection-routing.module';
import {CollectionComponent} from './collection.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "primeng/menu";


@NgModule({
  declarations: [
    CollectionComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MenuModule
  ]
})
export class CollectionModule {
}
