
export class TempPurchaseInquiryItemModel{    
    
    PurchaseInquiryItemId:string;
    ItemID:string; //customer item id or description
    Description:string;
    CustomerItemCode:string;
    Quantity: number;
    Unit: string;
    Status: number;
    //Comments:string;
    Requester:string; //it will be a free text.
    RequestDate: Date;
    RequiredDate: Date;
    ShipToLocation: string; 
    PurchaseInquiryId:string;
    
} 