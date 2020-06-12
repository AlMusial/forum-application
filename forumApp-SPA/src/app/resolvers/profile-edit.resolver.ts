import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
        resolve(route: ActivatedRouteSnapshot): Observable<User> { // metoda resolve juz domyslnie subskrybuje wiec nie trzeba uzywac subs()
            // tslint:disable-next-line:no-string-literal
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe( // pipe do wylapania problemow
                catchError(error => {
                    this.alertify.errorMessage('Problem with retrieving your data');
                    this.router.navigate(['/profile']); // przeniesienie na glowna strone w razie wystapienia error
                    return of(null); // zwrocenie typu observable = null
                })
            );
        }
}
