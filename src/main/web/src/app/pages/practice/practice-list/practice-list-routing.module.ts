import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PracticeListComponent} from "./practice-list.component";

const routes: Routes = [
  {
    path: '',
    component: PracticeListComponent
  },
  {
    path: 'playground',
    loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./practice-add/practice-add.module').then((m) => m.PracticeAddModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeListRoutingModule { }
