export class GlobalResource {
    public static dirty: boolean = false;

    public static leaveUnsavedDataConfirmation(): boolean {
        if (GlobalResource.dirty == true) {
            // Leave
            let leave: boolean = confirm("You have unsaved data. Do you want to leave?");
            if (leave) {
                GlobalResource.dirty = false;
            }
            return leave;
        }
        else {
            return true;
        }
    }
}