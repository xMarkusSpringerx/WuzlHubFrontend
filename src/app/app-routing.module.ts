import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {AuthGuard} from "./auth-guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OverviewComponent} from "./overview/overview.component";
import {PlayersComponent} from "./admin/players/players.component";
import {TournamentsComponent} from "./admin/tournaments/tournaments.component";
import {TournamentAddComponent} from "./admin/tournaments/tournament-add/tournament-add.component";
import {TournamentDetailComponent} from "./admin/tournaments/tournament-detail/tournament-detail.component";
import {PlayerDetailComponent} from "./admin/players/player-detail/player-detail.component";
import {PlayerAddComponent} from "./admin/players/player-add/player-add.component";
import {YourMatchesComponent} from "./admin/your-matches/your-matches.component";

const routes: Routes = [

  { path: '', component: OverviewComponent },
  /* Login */
  { path: 'login', component: LoginComponent },

  /* Admin */
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [AuthGuard],

    children: [
      /* map default admin path to dashboard */
      //{ path: '', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      /* Dashboard */
      { path: 'dashboard',
        component: DashboardComponent},

      /* Players */
      { path: 'players',
        component: PlayersComponent},
      { path: 'players/add',
        component: PlayerAddComponent},
      { path: 'players/:playerId',
        component: PlayerDetailComponent},
      /* Tournaments*/
      { path: 'tournaments',
        component: TournamentsComponent},
      { path: 'tournaments/add',
        component: TournamentAddComponent},
      { path: 'tournaments/:tournamentId',
        component: TournamentDetailComponent},

      { path: 'mymatches',
        component: YourMatchesComponent},
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
