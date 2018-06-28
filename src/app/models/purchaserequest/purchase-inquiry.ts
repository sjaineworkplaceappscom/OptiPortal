import { PurchaseInquiryItemModel } from "./purchase-inquiry-item";
import { NotesModel } from "./notes";

export class PurchaseInquiryModel{    
    InquiryId:number;
    CustomerId:number;
    CustomerName:string;
    InquiryStatus:string;
    ValidUntil:string;
    ReferenceId: string;
    CreatedDate:string;
    Buyer:string;//CreatedBy:string;
    ModifiedDate:string;
    ModifiedBy:string;
    public PurchaseEnquiryItemList: Array<PurchaseInquiryItemModel>=[];
    public NotesList: Array<NotesModel>=[];
}