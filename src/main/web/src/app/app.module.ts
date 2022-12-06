import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { PlaygroundComponent } from './playground/playground.component';
import {RouterModule} from "@angular/router";
import { NewFlashCardComponent } from './new-flash-card/new-flash-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlashCardListComponent } from './flash-card-list/flash-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashCardComponent,
    PlaygroundComponent,
    NewFlashCardComponent,
    NavBarComponent,
    FlashCardListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'flash-cards', component: PlaygroundComponent },
      { path: 'flash-cards/new', component: NewFlashCardComponent },
      { path: 'flash-cards/list', component: FlashCardListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
