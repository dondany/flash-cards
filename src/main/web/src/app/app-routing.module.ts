import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationGuard} from "./shared/services/authentication.guard";
import {HomeLayoutComponent} from "./layouts/home-layout/home-layout.component";
import {LandingLayoutComponent} from "./layouts/landing-layout/landing-layout.component";

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
