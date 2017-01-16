import {Component, OnInit} from '@angular/core';
import {PlayerApi} from "./services/PlayerApi";
import {HttpAuthenticatedService} from "./http-authenticated.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      console.log("schon eingeloggt");
    }
  }
  constructor(private auth : HttpAuthenticatedService, private router: Router){


  }
}
