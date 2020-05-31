import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { isBuffer } from 'util';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept( // wylapie wszystkie error message z odpowiedzi http
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
        if (error.status === 401) {
            return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
            // odebranie 500 error, odczytanie ich z naglowkow Application-Error
            const applicationError = error.headers.get('Application-Error');
            if (applicationError) {
                return throwError(applicationError);
            }
            const serverError = error.error; // error.error bo idziemy poziom nizej w strukturze z http r.
            let modalStateErrors = '';
            if (serverError.errors && typeof serverError.errors === 'object') { // grzebanie aby wyciagnac tekst bledu walidacji
                for (const key in serverError.errors) {                         //  np username alreaady exists
                    if (serverError.errors[key]) {
                        modalStateErrors += serverError.errors[key] + '\n'; // tworzenie listy stringow oddzielonych spacja errormessage
                    }
                }
            }
            return throwError(modalStateErrors || serverError || 'Server Error'); // server Error jesli nie bedzie zadnego z wczesniejszych
        }
    }));
  }
}

export const ErrorInterceptorProvider = {
    // dodanie tej stalej do istniejacej juz angularowej listy providerow
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true // bo moze dawac rozne errory
};
