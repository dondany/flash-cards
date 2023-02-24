import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FcCardComponent } from './fc-card/fc-card.component';
import { FcContextMenuComponent } from './fc-context-menu/fc-context-menu.component';
import { NewFcModalComponent } from './new-fc-modal/new-fc-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditFcModalComponent } from './edit-fc-modal/edit-fc-modal.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    FcCardComponent,
    FcContextMenuComponent,
    NewFcModalComponent,
    EditFcModalComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
