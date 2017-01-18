import {Injectable, NgModule} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {environment} from "../environments/environment";
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

@Injectable()
export class HttpAuthenticatedService {

  public allHeaders: Headers;
  private baseApiUrl;



  constructor(
    private http: Http, private router : Router
  ) {
    this.allHeaders = new Headers();
    this.baseApiUrl = environment.baseApiPath + "/api/login";
  }

  login(username : string, password : string) : any {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString();

    let options = new RequestOptions({ headers: headers });

    this.http.post(this.baseApiUrl, body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('id_token', data.access_token);
          this.router.navigate(['admin/dashboard']);
        },
        error => {
          console.log("shiat");
          error => console.log(error);
          return false;
        }

      );

  }

  loggedIn() {
    return tokenNotExpired();
  }

  isAdmin() : boolean {
    var jwtHelper = new JwtHelper();
    if(localStorage.getItem('id_token')){

      var token = jwtHelper.decodeToken(localStorage.getItem('id_token'));

      console.log(token);
      if(token.role == "Administrator") {
        return true;
      }
      return false;
    } else {

      return false;
    }
  }

  getLoggedInUsername() {
    var jwtHelper = new JwtHelper();
    if(localStorage.getItem('id_token')){

      var token = jwtHelper.decodeToken(localStorage.getItem('id_token'));

      console.log(token);

      return token.sub;
    } else {
      return "";
    }
  }



  logout() {
    localStorage.removeItem('id_token');
  }

}
