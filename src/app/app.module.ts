import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {RouterModule, RouterOutletMap} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {HttpAuthenticatedService} from "./http-authenticated.service";
import {WuHuWebAppRoutingModule} from "./app-routing.module";
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OverviewComponent } from './overview/overview.component';
import {AuthGuard} from "./auth-guard.service";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    PageNotFoundComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WuHuWebAppRoutingModule
  ],
  providers: [
    HttpAuthenticatedService,
    RouterModule,
    RouterOutletMap,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
