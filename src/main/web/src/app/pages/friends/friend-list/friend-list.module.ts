import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendListRoutingModule } from './friend-list-routing.module';
import { FriendListComponent } from './friend-list.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";


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
    FormsModule
  ]
})
export class FriendListModule { }
