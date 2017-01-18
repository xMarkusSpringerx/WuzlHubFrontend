import { Component, OnInit } from '@angular/core';
import {Tournament} from "../../../model/tournament";
import {TournamentApi} from "../../../services/TournamentApi";
import {ActivatedRoute} from "@angular/router";
import {Match} from "../../../model/match";
import {Validators, FormBuilder} from "@angular/forms";
import {MatchApi} from "../../../services/MatchApi";

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
  providers: [TournamentApi, MatchApi]
})
export class TournamentDetailComponent implements OnInit {

  private tournament : Tournament = new Tournament;
  private matches : [Match];

  constructor(
    private tournamentService : TournamentApi,
    private activatedRoute : ActivatedRoute,
    public fb: FormBuilder,
    private matchService : MatchApi
  ) { }

  public addGoals = this.fb.group({
    goalsTeam1: ["", Validators.required],
    goalsTeam2: ["", Validators.required],
  });


  submitGoals(match) {
    match.match.goalsTeam1 = this.addGoals.value.goalsTeam1;
    match.match.goalsTeam2 = this.addGoals.value.goalsTeam2;
    match.match.hasEnded = true;


    this.matchService.MatchByIdPut(match.match.id, match.match).subscribe(
      (result) => {
        console.log(result);

        this.ngOnInit();

      },
      (error) => {

      }
    );

    console.log(this.addGoals.value.goalsTeam1);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: any) => {
        let tournamentId = param['tournamentId'];
        console.log(tournamentId);

        this.tournamentService.TournamentByIdGet(tournamentId).subscribe(
          (result) => {
            this.tournament = result.tournament;
            this.matches = result.matchesInTournament;
            console.log(this.matches);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    );



  }

}
