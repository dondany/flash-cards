import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./project-list/project-list.module').then((m) => m.ProjectListModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./project-details/project-details.module').then((m) => m.ProjectDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
