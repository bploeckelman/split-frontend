import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../common/headers'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  response: string;

  constructor (private router: Router, private http: Http) {}

  login(event, username, password) {
    event.preventDefault();

    this.http.post('http://localhost:8080/user/login',
      JSON.stringify({ username, password }),
      { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem("token", response.json().token);
          this.response = null;
          this.router.navigate(['profile']);
        },
        error => {
          this.response = error.json();
          console.log(error.json());
        },
        () => console.log("login request complete")
      );
  }

  signup(event) {
    event.preventDefault();

    console.log("redirect to signup");
    this.router.navigate(['signup']);
  }

}
