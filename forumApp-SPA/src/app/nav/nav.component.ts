import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // przechowuje wpisany do formularza login oraz hasło
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.successMessage('Logged in successfully');
    }, error => {
      this.alertify.errorMessage('failed to logg in');
    }, () => { // mozna tez dac to kolo alertify ..., ale tutaj wykorzystuje sie kolejny opcjonalny parametr funkcji subs()
      this.router.navigate(['/threads']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn(); // jeśli coś jest w tym tokenie zwroci true, jesli nie: false
  }

  logout() {
    localStorage.removeItem('token'); // usuwa przechowany token w localStorage
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']); // ...tak jak tutaj
  }
}
