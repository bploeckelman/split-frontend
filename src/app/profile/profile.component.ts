import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  jwt: string;
  decodedJwt: string;
  jwtDate: Date;
  jwtExpired: boolean;
  response: string;
  api: string;
  jwtHelper: JwtHelper;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('token');
    if (!this.jwt) return;

    this.jwtHelper = new JwtHelper();
    if (!this.jwtHelper) return;

    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.jwtDate    = this.jwtHelper.getTokenExpirationDate(this.jwt);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.jwt);
  }

  logout() {
    localStorage.removeItem('token');

    console.log("logged out");
    this.router.navigate(['login']);
  }

  callAnonymousApi() {
    this._callApi('anonymous', 'http://localhost:8080/api/test');
  }

  callSecureApi() {
    this._callApi('secure', 'http://localhost:8080/api/secure/test');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'anonymous') {
      this.api = type;
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = JSON.stringify(error),
          () => console.log(type + " request complete")
        );
    }
    if (type === 'secure') {
      this.api = type;
      this.authHttp.get(url)
        .subscribe(
          data => this.response = data.text(),
          err => this.response = JSON.stringify(err),
          () => console.log(type + " request complete")
        );
    }
  }

}
