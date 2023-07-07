import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    loadChildren: () => import('../project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('../friends/friends.module').then((m) => m.FriendsModule)
  },
  {
    path: 'practice',
    loadChildren: () => import('../practice/practice.module').then((m) => m.PracticeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
