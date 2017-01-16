import { Component, OnInit } from '@angular/core';
import {HttpAuthenticatedService} from "../http-authenticated.service";
import {PlayerApi} from "../services/PlayerApi";
import {TournamentApi} from "../services/TournamentApi";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PlayerApi, TournamentApi]
})
export class AdminComponent implements OnInit {

  private isAdmin : boolean;
  constructor(private auth: HttpAuthenticatedService) {
    this.isAdmin = this.auth.isAdmin();
  }

  ngOnInit() {
  }

}
