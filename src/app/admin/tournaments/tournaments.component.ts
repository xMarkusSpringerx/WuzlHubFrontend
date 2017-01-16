import { Component, OnInit } from '@angular/core';
import {TournamentApi} from "../../services/TournamentApi";
import {Tournament} from "../../model/tournament";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  private tournaments : [Tournament];
  constructor(private service : TournamentApi) { }

  ngOnInit() {
    this.service.TournamentGet()
      .subscribe(
        (result) => {
          this.tournaments = result;
          console.log(this.tournaments);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
