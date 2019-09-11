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
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import {
    DialogService,
    DialogRef

} from '@progress/kendo-angular-dialog';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    public sessionExpireMsg: string = "Your session has been expired. please login again.";
    public invalidCredentials: string = "Invalid username or password.please try again."
    constructor(private router: Router, private dialogService: DialogService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errMsg = '';

                    if (error.status == 0) {
                        this.errorMessage('Unable to reach to server.')
                    }

                    // Client Side Error
                    if (error.error instanceof ErrorEvent) {
                        errMsg = `Error: ${error.error.message}`;
                    }

                    // Server Side Error
                    else {

                        errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        console.log(errMsg);

                        // Unauthorized.
                        if (error.status == 401) {
                            let token = localStorage.getItem("AccessToken")
                            if (token == null || token == undefined || token == '') {
                                return this.errorMessage(this.sessionExpireMsg);
                            }
                            else { return this.errorMessage(this.invalidCredentials); }

                        }
                        // Server error
                        else if (error.status == 500 && error.error != null && error.error != undefined) {
                            // Session not found.
                            if (error.error.PortalExceptionType == 1) {
                                return this.errorMessage(this.sessionExpireMsg);
                            }
                            else if (error.error.PortalExceptionType == 3) {
                                errMsg = "Given email alreday exists."
                                return throwError(errMsg);
                            }
                            else {
                                return this.errorMessage("Server Error: \n" + error.error.Message);
                            }
                        }
                        else {
                            // Exceptional case
                            //this.errorMessage("Something went wrong");
                            console.log(error);
                            return throwError(error.message);
                        }

                    }
                })
            );

    }


    public async errorMessage(errorMessage: string): Promise<any> {

        const dialog: DialogRef = this.dialogService.open({
            title: 'Error',
            content: errorMessage,
            actions: [
                { text: 'Ok', primary: true }

            ],
            width: 450,
            height: 200,
            minWidth: 250
        });

        let resp: any = await dialog.result.toPromise();

        if (resp.text == 'Ok') {
            // clear cache and navigate to landing
            let lang = localStorage.getItem('appLanguage');      
            localStorage.clear();
            localStorage.setItem('appLanguage',lang);  
            this.router.navigate(['landing']);
            //  return;
        }


    }
}  