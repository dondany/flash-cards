import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeAddRoutingModule } from './practice-add-routing.module';
import { PracticeAddComponent } from './practice-add.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    PracticeAddComponent
  ],
  imports: [
    CommonModule,
    PracticeAddRoutingModule,
    BreadcrumbModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class PracticeAddModule { }
