import { ToastService } from "./services/toast.service";

export class GlobalResource {
    public static dirty: boolean = false;   
    public static NavigateFromAdvanseShipmentNotes:boolean=false;
    public static ShatredData:any=null;
    constructor(private toast:ToastService){

    }
}