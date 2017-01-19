import { Component, OnInit } from '@angular/core';
import {MatchApi} from "../../services/MatchApi";
import {PlayerApi} from "../../services/PlayerApi";
import {HttpAuthenticatedService} from "../../http-authenticated.service";
import {Validators, FormBuilder} from "@angular/forms";
import {LiveResult} from "../../model/live-result";
import {TournamentApi} from "../../services/TournamentApi";
import {ActivatedRoute} from "@angular/router";
import {LiveResultApi} from "../../services/LiveResultApi";

@Component({
  selector: 'app-your-matches',
  templateUrl: './your-matches.component.html',
  styleUrls: ['./your-matches.component.css'],
  providers: [MatchApi, LiveResultApi, TournamentApi, PlayerApi]
})
export class YourMatchesComponent implements OnInit {
  private matches;

  constructor(
    private matchService : MatchApi,
    private playerService : PlayerApi,
    private authService : HttpAuthenticatedService,
    private tournamentService : TournamentApi,
    private activatedRoute : ActivatedRoute,
    public fb: FormBuilder,
    private liveResultService : LiveResultApi
  ) { }

  public addGoals = this.fb.group({
    goalsTeam1: ["", Validators.required],
    goalsTeam2: ["", Validators.required]
  });

  submitGoals(match) {

    var liveResult = new LiveResult();
    liveResult.matchId = match.match.id;
    liveResult.entryAdded = new Date();
    liveResult.goalsTeam1 = this.addGoals.value.goalsTeam1;
    liveResult.goalsTeam2 = this.addGoals.value.goalsTeam2;

    this.liveResultService.LiveResultPost(liveResult).subscribe(
      (result) => {
        console.log("Update Match: ");
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );

    match.match.goalsTeam1 = this.addGoals.value.goalsTeam1;
    match.match.goalsTeam2 = this.addGoals.value.goalsTeam2;
    match.match.hasEnded = false;

    this.matchService.MatchByIdPut(match.match.id, match.match).subscribe(
      (result) => {
        console.log("End Match: ");
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );

    this.addGoals.reset();
  }

  endMatch(match){
    match.match.hasEnded = true;

    this.matchService.MatchByIdPut(match.match.id, match.match).subscribe(
      (result) => {
        console.log("End Match: ");
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );

    this.addGoals.reset();
  }

  ngOnInit() {
    this.playerService.PlayerFindbyusernameByUsernameGet(this.authService.getLoggedInUsername()).subscribe(
      (result) => {
        this.matchService.MatchFindByPlayerGet(result.id).subscribe(
          (result) => {
            console.log(result);
            this.matches = result;
          },
          (error) => {

          }
        )
      },
      (error) => {

      }
    );

  }

  private userPlaysInMatch(match) {
    var username = this.authService.getLoggedInUsername()
    if(
      username == match.team1.player1.player.userName ||
      username == match.team1.player2.player.userName ||
      username == match.team2.player1.player.userName ||
      username == match.team2.player2.player.userName
    ) {
      return true;
    } else {
      return false;
    }
  }

}
