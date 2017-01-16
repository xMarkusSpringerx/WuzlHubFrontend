import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {HttpAuthenticatedService} from "./http-authenticated.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: HttpAuthenticatedService, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
