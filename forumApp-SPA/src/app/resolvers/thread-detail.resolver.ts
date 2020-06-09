import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Thread } from '../models/thread';
import { ThreadService } from '../services/thread.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThreadDetailResolver implements Resolve<Thread> {
    constructor(private threadService: ThreadService, private router: Router, private alertify: AlertifyService) {}
        resolve(route: ActivatedRouteSnapshot): Observable<Thread> { // met. resolve juz domyslnie subskrybuje wiec nie trzeba uzywac subs()
            return this.threadService.getThread(route.params.id).pipe( // pipe do wylapania problemow
                catchError(error => {
                    this.alertify.errorMessage('Problem with retrieving data');
                    this.router.navigate(['/threads']); // przeniesienie na glowna strone w razie wystapienia error
                    return of(null); // zwrocenie typu observable = null
                })
            );
        }
}
