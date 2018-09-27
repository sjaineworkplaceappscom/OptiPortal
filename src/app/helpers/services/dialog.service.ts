import { GlobalResource } from "../global-resource";
import { Component, Injectable } from '@angular/core';
import {
    DialogService,
    DialogRef,
    DialogCloseResult,
    DialogResult
} from '@progress/kendo-angular-dialog';
import { Observable } from "../../../../node_modules/rxjs";


@Injectable({
    providedIn: "root"
})
export class ConfirmDialog {
    constructor(private dialogService: DialogService) {
    }  

    public async leaveUnsavedDataConfirmation(): Promise<boolean> {
        if (GlobalResource.dirty == true) {
            const dialog: DialogRef = this.dialogService.open({
                title: 'Please confirm',
                content: 'Do you want to discard your changes?',
                actions: [
                    { text: 'No' },
                    { text: 'Yes', primary: true }
                ],
                width: 450,
                height: 200,
                minWidth: 250
            });

            let resp: any = await dialog.result.toPromise();
            if (resp.text == 'Yes') {
                GlobalResource.dirty = false;
            }

            return resp.text == 'Yes';
        }

        else {

            return true;
        }
    }
    //  return  dialog.result.subscribe(
    //         (result) => {

    //             if (result instanceof DialogCloseResult) {

    //                 console.log('close');
    //                 leave = false;
    //             }
    //             else {
    //                 console.log('action', result);

    //                 if (result.text == 'Yes') {
    //                     leave = true;
    //                     GlobalResource.dirty = false;
    //                 }
    //                 else {
    //                     leave = false;
    //                 }

    //             }

    //             //this.result = JSON.stringify(result);
    //             return leave;
    //         },
    //         () => {
    //             return leave;
    //         }
    //     );




}