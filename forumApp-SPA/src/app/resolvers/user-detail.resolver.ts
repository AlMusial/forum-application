import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}
        resolve(route: ActivatedRouteSnapshot): Observable<User> { // metoda resolve juz domyslnie subskrybuje wiec nie trzeba uzywac subs()
            return this.userService.getUser(route.params.id).pipe( // pipe do wylapania problemow
                catchError(error => {
                    this.alertify.errorMessage('Problem with retrieving data');
                    this.router.navigate(['/threads']); // przeniesienie na glowna strone w razie wystapienia error
                    return of(null); // zwrocenie typu observable = null
                })
            );
        }
}
