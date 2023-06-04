import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignInRoutingModule} from './sign-in-routing.module';
import {SignInComponent} from './sign-in.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class SignInModule {

}
