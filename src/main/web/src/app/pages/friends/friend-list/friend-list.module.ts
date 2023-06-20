import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendListRoutingModule } from './friend-list-routing.module';
import { FriendListComponent } from './friend-list.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    FriendListComponent
  ],
  imports: [
    CommonModule,
    FriendListRoutingModule,
    BreadcrumbModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DataViewModule,
    CardModule,
    AvatarModule,
    TagModule
  ]
})
export class FriendListModule { }
