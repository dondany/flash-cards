import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PracticeAddComponent} from "./practice-add.component";

const routes: Routes = [
  {
    path: '',
    component: PracticeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeAddRoutingModule { }
