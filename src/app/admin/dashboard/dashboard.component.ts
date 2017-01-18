import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {PlayerApi} from "../../services/PlayerApi";
import {Player} from "../../model/player";
import {TournamentApi} from "../../services/TournamentApi";
import {Match} from "../../model/match";
import {Tournament} from "../../model/tournament";
import {CurrentStrengthApi} from "../../services/CurrentStrengthApi";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PlayerApi, TournamentApi, CurrentStrengthApi]
})
export class DashboardComponent implements OnInit {

  private players : [any];
  private tournament = new Tournament;
  private currentMatches : [Match];

  private chartOptions : Object;
  private playerData = [];

  constructor(
    private playerService : PlayerApi,
    private tournamentService : TournamentApi,
    private currentStrengthService : CurrentStrengthApi
  ) {

  }

  ngOnInit() {
    this.chartOptions = {
      title : { text : 'AAPL Stock Price' },
      series : [{
        name : 'AAPL',
        data : this.playerData,

      }]
    };

    this.playerService.PlayerGet()
      .subscribe(
        (result) => {
          this.players = result;
          //console.log(this.players);

          for(var player of this.players) {
            if(!player.strength) {
              player.strength = {strength : 0};
            }
          }
          this.players.sort(function(a, b) {
            return parseInt(b.strength.strength) - parseInt(a.strength.strength);
          });


          this.setChartOptions();
        },
        (error) => {
          console.log(error);
        }
      );

    this.tournamentService.TournamentByDateGet(new Date().toDateString()).subscribe(
      (result) => {
        this.tournament = result.tournament;
        this.currentMatches = result.matchesInTournament;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  setChartOptions(){
    for(var i = 0; i < 5; i++) {
      var playerId = this.players[i].id;
      console.log(playerId);
      this.currentStrengthService.CurrentStrengthFindallbyplayerByPlayerIdGet(playerId).subscribe(
        (result) => {
          var data = [];
          for(var singleRes in result) {
            data.push(result[singleRes].strength);
          }

          var options = {
            name : this.players[i].player.userName,
            data : data
          };

          this.playerData.push(options);

        },
        (error) => {
          console.log(error);
        }
      );

    }


  }

}
