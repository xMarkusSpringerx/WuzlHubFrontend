import { Component, OnInit } from '@angular/core';
import {PlayerApi} from "../../services/PlayerApi";
import {Player} from "../../model/player";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private players : [Player];
  constructor(private service : PlayerApi) {}

  ngOnInit() {
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
