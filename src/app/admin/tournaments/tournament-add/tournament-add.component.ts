import {Component, OnInit} from '@angular/core';
import {PlayerApi} from "../../../services/PlayerApi";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {TournamentApi} from "../../../services/TournamentApi";
import {Tournament} from "../../../model/tournament";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.css'],
  providers: [PlayerApi]
})
export class TournamentAddComponent implements OnInit {

  private players;

  private playerControls = [];

  public addForm = this.fb.group({
    name: ["", Validators.required],
    dateTime: ["", Validators.required],
    countMatches: ["", Validators.required],
    countdownSeconds : [""]
  });

  constructor(private playerService: PlayerApi,
              private tournamentService : TournamentApi,
              public fb: FormBuilder,
              private router : Router,
              private notificationService : NotificationsService
  ) {
  }

  ngOnInit() {
    this.playerService.PlayerGet().subscribe(
      (result) => {
        this.players = result;
        for (let playerObj of this.players) {
          this.playerControls.push(playerObj.player.id.toString());
          let control: FormControl = new FormControl(false);
          this.addForm.addControl(playerObj.player.id, control);
        }
      },
      (error) => {
        console.log(error);
      });

  }

  public addTournament(event) {

    var playerIds = [];

    var tournament = new Tournament();


    for(var key in this.addForm.value) {

      if(this.playerControls.indexOf(key) != -1) {
        /* Player Control*/
        if(this.addForm.value[key] == true) {
          playerIds.push(key);
        }

      } else {
        /* Normal control*/
        tournament.name = this.addForm.value.name;
        tournament.date = this.addForm.value.dateTime;
        tournament.countdownSeconds = this.addForm.value.countdownSeconds;
      }
    }

    this.tournamentService.TournamentPost(tournament).subscribe(
      (result) => {
        var tournament = result.tournament;
        this.tournamentService.TournamentByTournamentIdInsertplayersPost(tournament.id, playerIds).subscribe(
          (result) => {
            this.tournamentService.TournamentByTournamentIdCreatematchesByAmountGet(tournament.id, this.addForm.value.countMatches).subscribe(
              (result) => {
                console.log(result);
                this.router.navigate(['/admin/tournaments/', tournament.id]);
                this.notificationService.success("Wuhu", "Tournament erfolgreich hinzugefügt");
              },
              (error) => {
                this.notificationService.error("Hmm", error._body);
              }
            )
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
