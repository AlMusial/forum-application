import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { from } from 'rxjs';
// serwis pobierajacy wpisane dane do formularza logowania i odbierający token od api

@Injectable({ // pozwala na wstrzykiwanie zaleznosci, komponenty domyślnie mogą byc a serwisy nie
  providedIn: 'root' // root module to appmodule
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeProfilePhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const user = response; // wpisujemy token ktory dostalismy od api
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user)); // pobranie usera z localStorage
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeProfilePhoto(this.currentUser.profilePhoto);
        }
      })
      ); // pipe pozwala na dolaczenie odpowiedzi json jaka dostaniemy od bazy
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
