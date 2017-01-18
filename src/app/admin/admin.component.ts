import { Component, OnInit } from '@angular/core';
import {HttpAuthenticatedService} from "../http-authenticated.service";
import {PlayerApi} from "../services/PlayerApi";
import {TournamentApi} from "../services/TournamentApi";
import {RoleApi} from "../services/RoleApi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PlayerApi, TournamentApi, RoleApi]
})
export class AdminComponent implements OnInit {

  private isAdmin : boolean;
  constructor(
    private auth: HttpAuthenticatedService,
    private router : Router
  ) {
    this.isAdmin = this.auth.isAdmin();
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
