export class OpenInvoiceListModel{
    InvoiceId:number;
    InvoiceNumber:number;

    InvoiceDate:Date;
    DueDate:Date;
    Amount:number;
    Freight:string;
    Tax:number;
    TotalAmount:number;
    BillToAddress:string;
    ContactPerson:string;
}