import { NotificacionService } from './../util/notificacion.service';
import { NotificacionComponent } from './../util/notificacion/notificacion.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar, 
        private router : Router,
        private notificacion : NotificacionService
        ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS))
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.notificacion.mostrarNotificacion('ERROR 400 ->'+err.message,"OK","error");
                    // this.snackBar.open(err.message, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {                    
                    this.notificacion.mostrarNotificacion('ERROR 401 ->'+err.message,"OK","error");
                    // this.snackBar.open(err.error.message, 'ERROR 401', { duration: 5000 });
                    //sessionStorage.clear();
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.notificacion.mostrarNotificacion('ERROR 500 ->'+err.message,"OK","error");
                    // this.snackBar.open(err.error.message, 'ERROR 500', { duration: 5000 });
                } else {
                    this.notificacion.mostrarNotificacion('ERROR ->'+err.message,"OK","error");
                    // this.snackBar.open(err.error.message, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}