import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FcCardComponent} from './fc-card/fc-card.component';
import {FcContextMenuComponent} from './fc-context-menu/fc-context-menu.component';
import {NewFcModalComponent} from './new-fc-modal/new-fc-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EditFcModalComponent} from './edit-fc-modal/edit-fc-modal.component';
import {ClickOutsideDirective} from './click-outside.directive';
import {FcListComponent} from './fc-list/fc-list.component';
import {RouterModule} from "@angular/router";
import { FcCollectionListComponent } from './fc-collection-list/fc-collection-list.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FcCardComponent,
    FcContextMenuComponent,
    NewFcModalComponent,
    EditFcModalComponent,
    ClickOutsideDirective,
    FcListComponent,
    FcCollectionListComponent,
    CollectionCardComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FcListComponent },
      { path: 'collection', component: FcCollectionListComponent },
      { path: 'projects', component: ProjectListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
