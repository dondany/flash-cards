import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectDetailsComponent} from "./project-details.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailsComponent,
  },
  {
    path: 'collections/add',
    loadChildren: () => import('./collection-add/collection-add.module').then((m) => m.CollectionAddModule)
  },
  {
    path: 'collections/:collectionId',
    loadChildren: () => import('./collection/collection.module').then((m) => m.CollectionModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./project-settings/project-settings.module').then((m) => m.ProjectSettingsModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
