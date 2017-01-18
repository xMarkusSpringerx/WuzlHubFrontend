import { Component, OnInit } from '@angular/core';
import {TournamentApi} from "../../services/TournamentApi";
import {Tournament} from "../../model/tournament";
import {HttpAuthenticatedService} from "../../http-authenticated.service";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  private tournaments : [any];
  private isAdmin : boolean;
  constructor(
    private service : TournamentApi,
    private playerService: HttpAuthenticatedService
  ) { }

  ngOnInit() {

    this.isAdmin = this.playerService.isAdmin();

    this.service.TournamentGet()
      .subscribe(
        (result) => {
          this.tournaments = result;
          this.tournaments.sort(function(a, b) {
            return +new Date(b.tournament.date) - +new Date(a.tournament.date);
          });


        },
        (error) => {
          console.log(error);
        }
      );


  }

}
