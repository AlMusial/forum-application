import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// serwis pobierajacy wpisane dane do formularza logowania i odbierający token od api

@Injectable({ // pozwala na wstrzykiwanie zaleznosci, komponenty domyślnie mogą byc a serwisy nie
  providedIn: 'root' // root module to appmodule
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const user = response; // wpisujemy token ktory dostalismy od api
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
      ); // pipe pozwala na dolaczenie odpowiedzi json jaka dostaniemy od bazy
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
