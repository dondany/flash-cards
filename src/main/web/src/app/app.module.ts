import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlashCardListRowComponent } from './flash-card-list-row/flash-card-list-row.component';
import { ModalComponent } from './modal/modal.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ContentPanelComponent } from './content-panel/content-panel.component';
import { PaginationNavComponent } from './pagination-nav/pagination-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashCardComponent,
    NavBarComponent,
    FlashCardListRowComponent,
    ModalComponent,
    SideBarComponent,
    ContentPanelComponent,
    PaginationNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
