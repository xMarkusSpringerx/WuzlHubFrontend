import {Component, OnInit} from '@angular/core';
import {PlayerApi} from "./services/PlayerApi";
import {HttpAuthenticatedService} from "./http-authenticated.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-root',
  template: `<simple-notifications [options]=options></simple-notifications><router-outlet></router-outlet>`,
  providers: [NotificationsService]
})
export class AppComponent implements OnInit {

  public options = {
    timeOut: 5000
  };

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      console.log("schon eingeloggt");
    }
  }
  constructor(private auth : HttpAuthenticatedService, private router: Router){
  }
}
