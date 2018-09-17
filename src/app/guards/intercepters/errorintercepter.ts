// Http error Intercepter
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';
import { Injectable } from '../../../../node_modules/@angular/core';
import { Alert } from '../../../../node_modules/@types/selenium-webdriver';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errMsg = '';
                    // Client Side Error
                    if (error.error instanceof ErrorEvent) {
                        errMsg = `Error: ${error.error.message}`;
                    }
                    else {  // Server Side Error
                        errMsg = `Error Code: ${error.status},  Message: ${error.message}`;

                        console.log("Error:"+errMsg);
                        if(error.error!=null && error.error!=undefined){
                       // Session expired
                        if (error.error.PortalExceptionType==1) {
                            alert("Your session has been expired. please login again.");
                            // clear cache and navigate to landing
                            localStorage.clear();
                            this.router.navigate(['landing']);
                            return;
                        }

                        if (error.error.PortalExceptionType==3) {
                           errMsg="Given email alreday exists."                            
                            //return;
                        }
                    }
                    else{
                        if(error.status==401){
                            alert("Your session has been expired. please login again.");
                            localStorage.clear();
                            this.router.navigate(['landing']);
                        }
                    }

                    }

                    return throwError(errMsg);
                })
            )
    }
}  