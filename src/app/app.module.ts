import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from "./common/auth.guard";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

import { routes } from './app.routes';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: "Authorization",
    headerPrefix: "Bearer",
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: false,
    noTokenScheme: false
  }), http);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthGuard
  ]
})
export class AppModule { }
