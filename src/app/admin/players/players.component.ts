import { Component, OnInit } from '@angular/core';
import {PlayerApi} from "../../services/PlayerApi";
import {Player} from "../../model/player";
import {HttpAuthenticatedService} from "../../http-authenticated.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private players : [Player];
  private isAdmin : boolean;
  constructor(
    private service : PlayerApi,
    private playerService : HttpAuthenticatedService
  ) {}

  ngOnInit() {
    this.isAdmin = this.playerService.isAdmin();
    this.service.PlayerGet()
      .subscribe(
      (result) => {
        this.players = result;
        console.log(this.players);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
