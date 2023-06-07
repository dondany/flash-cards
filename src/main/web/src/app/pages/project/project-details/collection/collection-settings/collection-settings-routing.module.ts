import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CollectionSettingsComponent} from "./collection-settings.component";

const routes: Routes = [
  {
    path: '',
    component: CollectionSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionSettingsRoutingModule { }
