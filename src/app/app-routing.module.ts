import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './shell/main/main.component';
import {AuthComponent} from './shell/main/auth/auth.component';
import {AuthGuard} from './shared/services/auth-guard';


const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
