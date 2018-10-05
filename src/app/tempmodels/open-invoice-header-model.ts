export class OpenInvoiceHeaderModel{
    InvoiceNumber:number;
    InvoiceDate:Date;
    DueDate:Date;
    Amount:number;
    Freight:string;
    Tax:number;
    TotalAmount:number;
    Discount:number; //need to check it will be either discount percent or discount amount.
    BillToAddress:string;
    ContactPerson:string;
    PaymentTerms:string;
    AdvancePaidAmount:number;
    BalanceDue:number;
}