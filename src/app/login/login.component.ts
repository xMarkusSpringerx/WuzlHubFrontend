import {Component, OnInit} from '@angular/core';
import {HttpAuthenticatedService} from "../http-authenticated.service";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }

  private falseLogin: boolean;

  constructor(private auth: HttpAuthenticatedService, private router: Router) {

  }

  login(event, username, password) {

    if (this.auth.login(username, password)) {
      this.falseLogin = false;
    } else {
      this.falseLogin = true;
    }

  }
}

