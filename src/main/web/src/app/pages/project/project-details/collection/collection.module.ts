import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";


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
        DataViewModule
    ]
})
export class CollectionModule { }
