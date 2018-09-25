export class GlobalResource {
    public static dirty: boolean = false;

    public static leaveUnsavedDataConfirmation(): boolean {
        if (GlobalResource.dirty == true) {
            // Leave
            let leave: boolean = confirm("Do you want to discard your changes?");
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