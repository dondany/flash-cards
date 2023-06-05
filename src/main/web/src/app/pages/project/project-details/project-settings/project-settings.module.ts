import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingsRoutingModule } from './project-settings-routing.module';
import { ProjectSettingsComponent } from './project-settings.component';
import {CardModule} from "primeng/card";
import {RadioButtonModule} from "primeng/radiobutton";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@NgModule({
  declarations: [
    ProjectSettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectSettingsRoutingModule,
    CardModule,
    RadioButtonModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule
  ]
})
export class ProjectSettingsModule { }
