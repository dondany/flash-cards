import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionComponent} from "./collection.component";

const routes: Routes = [
  {
    path: '',
    component: CollectionComponent
  },
  {
    path: 'settings',
    loadChildren: () => import('./collection-settings/collection-settings.module').then((m) => m.CollectionSettingsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule {
}
