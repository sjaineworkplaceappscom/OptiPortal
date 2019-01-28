//===============================================================================
// © 2017 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 Apr 2018
//==============================================================================

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Headers, Response, RequestMethod, RequestOptions, ResponseContentType } from '@angular/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: "root"
})

/**
 * This class provides the helper method to execute Web API request.
 */
export class HttpHelper {

    /**
     * Constructor
     * @param _http: inject http object 
     */
    constructor(private _http: HttpClient) {
    }

    /**
     *  Executes the get request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param args: The reqeust argument. 
     */
    get<T>(url: string, headers: HttpHeaders, enableAPILog?: boolean, actionName?: string): Observable<T> {


        // If reqeust header is null
        if (headers == null) {
            headers = new HttpHeaders();
        }
        

        headers = headers.set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        //.set("Authorization", 'Bearer ' + localStorage.getItem("AccessToken"));

        return this._http.get<T>(url, { headers: headers });

    }


    /**
     * Executes the put request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param data: The reqesut object.
     * @param args: The reqesut argument.
     */
    put<T>(url: string, data: any, headers: HttpHeaders, enableAPILog?: boolean, actionName?: string): Observable<T> {

        // If reqeust header is null
        if (headers == null) {
            headers = new HttpHeaders();
        }

        headers = headers.set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        //.set("Authorization", 'Bearer ' + localStorage.getItem("AccessToken"));

        // Call server API
        return this._http.put<T>(url, JSON.stringify(data), { headers });


    }

    /**
     * Executes the post request with given uri parameters and header values.
     * @param url: The reqeust URI. 
     * @param data: The reqeust object. 
     * @param args: The request argument. 
     */
    post<T>(url: string, data: any, headers: HttpHeaders, addDefaultHeaders: boolean = true, enableAPILog?: boolean, actionName?: string): Observable<T> {


        // If reqeust header is null
        if (headers == null) {
            headers = new HttpHeaders();
        }

        if (addDefaultHeaders) {
            // Add default header 
            headers = headers
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            //headers = headers.set("Authorization", 'Bearer ' + localStorage.getItem("AccessToken"));
            data = JSON.stringify(data)
        }

        // Add reqeust method 


        return this._http.post<T>(url, data, { headers })

    }

    delete<T>(url: string, data: any, headers: HttpHeaders, addDefaultHeaders: boolean = true, enableAPILog?: boolean, actionName?: string): Observable<T>{
        // If reqeust header is null
        if (headers == null) {
            headers = new HttpHeaders();
        }

        if (addDefaultHeaders) {
            // Add default header 
            headers = headers
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            headers = headers.set("Authorization", 'Bearer ' + localStorage.getItem("AccessToken"));
            data = JSON.stringify(data)
        }
        // reqeust method 
        return  this._http.delete<T>(url);
    }

    // /**
    //  * Executes the post request with given uri parameters and header values.
    //  * @param url: The reqeust URI. 
    //  * @param data: The reqeust object. 
    //  * @param args: The request argument. 
    //  */
    // postFile(url: string, data: any, requestOptions: RequestOptions, enableAPILog?: boolean, actionName?: string): Observable<any> {

    //     // Get current utc time
    //     //let clientReqesutTime: string = DateTimeHelper.getCurrentUTCDateTime();

    //     // Add reqeust method 
    //     requestOptions.method = RequestMethod.Post;

    //     return this._http.post(url, data, requestOptions)
    //         .map((res: Response) => {
    //             // WebAPI Log on Server            
    //             if (enableAPILog) {
    //                 // console.log(res);
    //                 // let webApiDebugLog: WebApiDebugLog = new WebApiDebugLog();
    //                 // webApiDebugLog.ActionName = actionName;
    //                 // webApiDebugLog.ClientRequestTime = clientReqesutTime;
    //                 // webApiDebugLog.ClientResponseRecTime = DateTimeHelper.getCurrentUTCDateTime();
    //                 // webApiDebugLog.RequestJson = JSON.stringify(data);
    //                 // webApiDebugLog.ResponeJson = JSON.stringify(this.json(res));
    //                 // webApiDebugLog.RequestUrl = url;
    //                 // this.logWebAPIDebugOnServer(webApiDebugLog, res.headers);
    //             }
    //             return res.json();
    //         });
    // }
    // /**
    //  * Executes the put request with given uri parameters and header values.
    //  * @param url: The reqeust URI.
    //  * @param data: The reqesut object.
    //  * @param args: The reqesut argument.
    //  */
    // put(url: string, data: any, requestOptions: RequestOptions, enableAPILog?: boolean, actionName?: string): Observable<any> {
    //     // Get current utc time
    //     // let clientReqesutTime: string = DateTimeHelper.getCurrentUTCDateTime();

    //     // If reqeust option is null
    //     if (requestOptions == null) {
    //         requestOptions = new RequestOptions();
    //     }

    //     // If reqeust header is null
    //     if (requestOptions.headers == null) {
    //         console.log("header null");
    //         requestOptions.headers = new Headers();
    //     }

    //     // Add default header 
    //     requestOptions.headers.append('Content-Type', 'application/json');
    //     requestOptions.headers.append('Accept', 'application/json');

    //     // Add reqeust method 
    //     requestOptions.method = RequestMethod.Put;

    //     // Call server API
    //     return this._http.put(url, JSON.stringify(data), requestOptions)
    //         .map((res: Response) => {
    //             // WebAPI Log on Server            
    //             if (enableAPILog) {
    //                 // let webApiDebugLog: WebApiDebugLog = new WebApiDebugLog();
    //                 // webApiDebugLog.ActionName = actionName;
    //                 // webApiDebugLog.ClientRequestTime = clientReqesutTime;
    //                 // webApiDebugLog.ClientResponseRecTime = DateTimeHelper.getCurrentUTCDateTime();
    //                 // webApiDebugLog.RequestJson = JSON.stringify(data);
    //                 // webApiDebugLog.ResponeJson = JSON.stringify(this.json(res));
    //                 // webApiDebugLog.RequestUrl = url;
    //                 // this.logWebAPIDebugOnServer(webApiDebugLog, res.headers);
    //             }
    //             return res.json();

    //         });
    // }

    // /**
    // * Executes the put request with given uri parameters and header values.
    //  * @param url: The reqeust URI.
    //  * @param data: The reqesut object.
    //  * @param args: The reqesut argument.
    //  */
    // remove(url: string, requestOptions: RequestOptions, enableAPILog?: boolean, actionName?: string): Observable<any> {
    //     // Get current utc time
    //     // let clientReqesutTime: string = DateTimeHelper.getCurrentUTCDateTime();

    //     // If reqeust option is null
    //     if (requestOptions == null) {
    //         requestOptions = new RequestOptions();
    //     }

    //     // If reqeust header is null
    //     if (requestOptions.headers == null) {
    //         requestOptions.headers = new Headers();
    //     }

    //     // Add default header 
    //     requestOptions.headers.append('Content-Type', 'application/json');
    //     requestOptions.headers.append('Accept', 'application/json');

    //     // Add reqeust method 
    //     requestOptions.method = RequestMethod.Delete;

    //     return this._http.delete(url, requestOptions)
    //         .map((res: Response) => {
    //             // WebAPI Log on Server            
    //             if (enableAPILog) {
    //                 // console.log(res);
    //                 // let webApiDebugLog: WebApiDebugLog = new WebApiDebugLog();
    //                 // webApiDebugLog.ActionName = actionName;
    //                 // webApiDebugLog.ClientRequestTime = clientReqesutTime;
    //                 // webApiDebugLog.ClientResponseRecTime = DateTimeHelper.getCurrentUTCDateTime();
    //                 // webApiDebugLog.RequestJson = "";
    //                 // webApiDebugLog.ResponeJson = JSON.stringify(this.json(res));
    //                 // webApiDebugLog.RequestUrl = url;
    //                 // this.logWebAPIDebugOnServer(webApiDebugLog, res.headers);
    //             }
    //             return res.json();
    //         });
    // }

    // /**
    //  * Method to get json object from http response.
    //  * @param res: http response object
    //  */
    // private json(res: Response): any {
    //     return res.text() === "" ? res : res.json();
    // }


    // dropBoxGetFile(url: string, _headers: Headers): Observable<any> {
    //     return this._http.get(url, { headers: _headers, responseType: ResponseContentType.Blob })
    //         .map((res: Response) => {
    //             return res.blob(); //JSON.stringify(res)
    //         });
    // }


    // /**
    //  * Executes the put request with given uri parameters and header values.
    //  * @param url: The reqeust URI.
    //  * @param data: The reqesut object.
    //  * @param args: The reqesut argument.
    //  */
    // delete(url: string, requestOptions: RequestOptions, enableAPILog?: boolean, actionName?: string): Observable<any> {
    //     // Get current utc time
    //     // let clientReqesutTime: string = DateTimeHelper.getCurrentUTCDateTime();

    //     // If reqeust option is null
    //     if (requestOptions == null) {
    //         requestOptions = new RequestOptions();
    //     }

    //     // If reqeust header is null
    //     if (requestOptions.headers == null) {
    //         console.log("header null");
    //         requestOptions.headers = new Headers();
    //     }

    //     // Add default header 
    //     requestOptions.headers.append('Content-Type', 'application/json');
    //     requestOptions.headers.append('Accept', 'application/json');

    //     // Add reqeust method 
    //     requestOptions.method = RequestMethod.Delete;

    //     // Call server API
    //     return this._http.delete(url, requestOptions)
    //         .map((res: Response) => {
    //             // WebAPI Log on Server            
    //             if (enableAPILog) {
    //                 // let webApiDebugLog: WebApiDebugLog = new WebApiDebugLog();
    //                 // webApiDebugLog.ActionName = actionName;
    //                 // webApiDebugLog.ClientRequestTime = clientReqesutTime;
    //                 // webApiDebugLog.ClientResponseRecTime = DateTimeHelper.getCurrentUTCDateTime();
    //                 // webApiDebugLog.ResponeJson = JSON.stringify(this.json(res));
    //                 // webApiDebugLog.RequestUrl = url;
    //                 // this.logWebAPIDebugOnServer(webApiDebugLog, res.headers);
    //             }
    //             return res.json();

    //         });
    // }

    // /**
    //  * Method ot save  API debug log on server
    //  * @param webApiDebugLog: Web api debug log model 
    //  * @param headers: Response headers 
    //  */
    // private logWebAPIDebugOnServer(webApiDebugLog: WebApiDebugLog, headers: Headers) {
    //     try {
    //         webApiDebugLog.ApplicationName = "Connect";
    //         webApiDebugLog.Description = "Bulk test with 500 records.";
    //         webApiDebugLog.Browser = navigator.userAgent;
    //         webApiDebugLog.IpAddress = "IpAddress";
    //         webApiDebugLog.ServerRequestRecTime = headers.get("RequestReceiveTime");
    //         webApiDebugLog.ServerResponseTime = headers.get("ReplyTime");
    //         let userSession = LocalStorageHelper.getUserSession();
    //         let UserOtherInfo = LocalStorageHelper.getUserOtherInfo();
    //         webApiDebugLog.TenantId = userSession.TenantId;
    //         webApiDebugLog.TenantName = UserOtherInfo.TenantName;
    //         webApiDebugLog.UserId = userSession.UserId;
    //         webApiDebugLog.UserName = UserOtherInfo.FullName;
    //         this.post(Config.UtilityBaseURL + 'dblogger/log/apidebug', webApiDebugLog, null)
    //             .subscribe(
    //                 res => { console.log("WebAPI debug logged on server successfully.") + res; },
    //                 error => { console.log(error); }
    //             );
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    // private appendTimeInUrl(url: string): string {
    //     if (url.indexOf('?') > -1) {
    //         return url += '&dt=' + DateTimeHelper.getCurrentUTCDateTimeInUnixMS().toString();
    //     }
    //     else {
    //         return url += '?dt=' + DateTimeHelper.getCurrentUTCDateTimeInUnixMS().toString();

    //     }

    // }

}
