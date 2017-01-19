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
  public isRequesting: boolean;
  private players : [Player];
  private isAdmin : boolean;
  constructor(
    private service : PlayerApi,
    private playerService : HttpAuthenticatedService
  ) {}

  ngOnInit() {
    this.isRequesting = true;
    this.isAdmin = this.playerService.isAdmin();
    this.service.PlayerGet()
      .subscribe(
      (result) => {
        this.players = result;
        console.log(this.players);
        this.isRequesting = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
