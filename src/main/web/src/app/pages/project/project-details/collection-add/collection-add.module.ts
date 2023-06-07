import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CollectionAddRoutingModule} from './collection-add-routing.module';
import {CollectionAddComponent} from './collection-add.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {RadioButtonModule} from "primeng/radiobutton";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    CollectionAddComponent
  ],
  imports: [
    CommonModule,
    CollectionAddRoutingModule,
    BreadcrumbModule,
    CardModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class CollectionAddModule {
}
