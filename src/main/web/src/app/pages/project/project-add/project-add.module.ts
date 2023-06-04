import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectAddRoutingModule } from './project-add-routing.module';
import { ProjectAddComponent } from './project-add.component';
import {CardModule} from "primeng/card";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {RadioButtonModule} from "primeng/radiobutton";


@NgModule({
  declarations: [
    ProjectAddComponent
  ],
  imports: [
    CommonModule,
    ProjectAddRoutingModule,
    CardModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RadioButtonModule
  ],
  providers: []
})
export class ProjectAddModule { }
