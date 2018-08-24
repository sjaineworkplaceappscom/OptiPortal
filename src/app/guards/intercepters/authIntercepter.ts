//===============================================================================
// © 2017 optipro Apps.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 Apr 2018
//==============================================================================

import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let loginAccessToken = localStorage.getItem("AccessToken");
        let loginUserId = localStorage.getItem("LoginUserId");
        
        if (loginAccessToken != '' && loginAccessToken != undefined && loginAccessToken != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + loginAccessToken
                }
            }
            );

            if(loginUserId!='' && loginUserId!=undefined &&  loginUserId!=null){
                req = req.clone({
                    setHeaders: {
                        SessionKey: loginUserId
                    }
                }
                );
            }
        }

        return next.handle(req);
    }
}