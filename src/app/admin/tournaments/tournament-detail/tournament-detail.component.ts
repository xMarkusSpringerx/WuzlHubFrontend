import { Component, OnInit } from '@angular/core';
import {Tournament} from "../../../model/tournament";
import {TournamentApi} from "../../../services/TournamentApi";
import {ActivatedRoute} from "@angular/router";
import {Match} from "../../../model/match";
import {Validators, FormBuilder} from "@angular/forms";
import {MatchApi} from "../../../services/MatchApi";
import {HttpAuthenticatedService} from "../../../http-authenticated.service";
import {LiveResultApi} from "../../../services/LiveResultApi";
import {LiveResult} from "../../../model/live-result";

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
  providers: [TournamentApi, MatchApi, HttpAuthenticatedService, LiveResultApi]
})
export class TournamentDetailComponent implements OnInit {

  private tournament : Tournament = new Tournament;
  private matches : [Match];
  private isAdmin : boolean;

  constructor(
    private tournamentService : TournamentApi,
    private activatedRoute : ActivatedRoute,
    public fb: FormBuilder,
    private matchService : MatchApi,
    private liveResultService : LiveResultApi,
    private authService : HttpAuthenticatedService
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
    this.isAdmin = this.authService.isAdmin();
    this.activatedRoute.params.subscribe(
      (param: any) => {
        let tournamentId = param['tournamentId'];

        this.tournamentService.TournamentByIdGet(tournamentId).subscribe(
          (result) => {
            this.tournament = result.tournament;
            this.matches = result.matchesInTournament;

          },
          (error) => {
            console.log(error);
          }
        )
      }
    );





  }

}
