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

  public isRequesting: boolean;

  private tournaments : [any];
  private isAdmin : boolean;
  constructor(
    private service : TournamentApi,
    private playerService: HttpAuthenticatedService
  ) { }

  ngOnInit() {
    this.isRequesting = true;
    this.isAdmin = this.playerService.isAdmin();

    this.service.TournamentGet()
      .subscribe(
        (result) => {
          this.tournaments = result;
          this.tournaments.sort(function(a, b) {
            return +new Date(b.tournament.date) - +new Date(a.tournament.date);
          });


          this.isRequesting = false;

        },
        (error) => {
          console.log(error);
        }
      );


  }

  private getActiveTournamentStyle(tournament) {

    var inDate = new Date(tournament.date);
    var actDate = new Date();

    if(
      inDate.getDate() == actDate.getDate() &&
      inDate.getMonth() == actDate.getMonth() &&
      inDate.getFullYear() == actDate.getFullYear()
    ) {
      return "lightyellow";
    }
  }

}
