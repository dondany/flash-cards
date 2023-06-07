import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionAddComponent} from "./collection-add.component";

const routes: Routes = [
  {
    path: '',
    component: CollectionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionAddRoutingModule {
}
