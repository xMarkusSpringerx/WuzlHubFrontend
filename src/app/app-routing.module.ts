import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {AuthGuard} from "./auth-guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [

  { path: '', component: OverviewComponent },
  /* Login */
  { path: 'login', component: LoginComponent },

  /* Admin */
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      /* map default admin path to dashboard */
      //{ path: '', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      /* Dashboard */
      { path: 'dashboard',
        component: DashboardComponent}
    ]
  },
  /* DEFAULT */
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class WuHuWebAppRoutingModule { }
