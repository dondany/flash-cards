import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectListRoutingModule} from './project-list-routing.module';
import {ProjectListComponent} from './project-list.component';
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {VisibilityModule} from "@fc/components/visibility"
import {AvatarGroupModule} from "primeng/avatargroup";


@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    DataViewModule,
    ButtonModule,
    AvatarModule,
    BreadcrumbModule,
    CardModule,
    ToolbarModule,
    VisibilityModule,
    AvatarGroupModule
  ],
  providers: []
})
export class ProjectListModule {
}
