import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionSettingsRoutingModule } from './collection-settings-routing.module';
import { CollectionSettingsComponent } from './collection-settings.component';
import {DividerModule} from "primeng/divider";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CardModule} from "primeng/card";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CollectionSettingsComponent
  ],
  imports: [
    CommonModule,
    CollectionSettingsRoutingModule,
    DividerModule,
    ConfirmDialogModule,
    CardModule,
    BreadcrumbModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class CollectionSettingsModule { }
