import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Photo } from '../models/photo';

// stworzenie header zeby przeslac token autoryzacyjny aby moc wyswietlic dane
// definiujemy go pobierajac token z localStorage

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user); // pod koniec przekazujemy obiekt
}
updatePhoto(id: number, user: User, photo: Photo) {
  return this.http.post(this.baseUrl  + id + 'photo/', user);
}
}
