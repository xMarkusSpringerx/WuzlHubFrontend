import { Component, OnInit } from '@angular/core';
import {HttpAuthenticatedService} from "../http-authenticated.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private isAdmin : boolean;
  constructor(private auth: HttpAuthenticatedService) {
    this.isAdmin = this.auth.isAdmin();
  }

  ngOnInit() {
  }

}
