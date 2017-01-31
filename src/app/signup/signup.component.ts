import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  response: string;

  constructor(public router: Router, public http: Http) { }

  signup(event, username, password) {
    event.preventDefault();

    this.http.post('http://localhost:8080/user/signup',
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
        () => console.log("signup request complete")
      );
  }

  login(event) {
    event.preventDefault();

    console.log("redirect to login");
    this.router.navigate(['login']);
  }

}
