import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // przechowuje wpisany do formularza login oraz hasło

  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
<<<<<<< HEAD
      console.log(error);
=======
      console.log('failed to login');
>>>>>>> 459758f815f73327b3b5bf0232ab875c1b84a886
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // jeśli coś jest w tym tokenie zwroci true, jesli nie: false
  }

  logout() {
    localStorage.removeItem('token'); // usuwa przechowany token w localStorage
    console.log('logged out');
  }
}
