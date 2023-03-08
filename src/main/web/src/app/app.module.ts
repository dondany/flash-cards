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
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { CollectionContextMenuComponent } from './collection-context-menu/collection-context-menu.component';
import { EditCollectionModalComponent } from './edit-collection-modal/edit-collection-modal.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
    ProjectListComponent,
    CollectionViewComponent,
    CollectionContextMenuComponent,
    EditCollectionModalComponent,
    CollectionDetailsComponent,
    ProjectViewComponent,
    ProjectDetailsComponent,
    ProjectCardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FcListComponent },
      { path: 'collections', component: FcCollectionListComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'collection', component: CollectionViewComponent },
      { path: 'project', component: ProjectViewComponent },
      { path: 'projects/:id', component: ProjectViewComponent},
      { path: 'projects/:projectId/collections/:collectionId', component: CollectionViewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
