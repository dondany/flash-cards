import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectDetailsComponent} from "./project-details.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailsComponent,
  },
  {
    path: 'collections/:collectionId',
    loadChildren: () => import('./collection/collection.module').then((m) => m.CollectionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
