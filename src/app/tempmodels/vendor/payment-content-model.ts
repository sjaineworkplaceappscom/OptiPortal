export class PaymentContentModel
{
    PaymentId: string
    LineNumber: string
    PORefNumber: string 
    InvoiceNumber: string 
    InvoiceLineNumber: string
    Item: string
    Quantity: string
    UnitPrice: string 
    UOM: string 
    TotalPrice: string
    TaxCode: string
    ShipToAddress: string
    BillToAddress: string
    ShipmentNumber: string
    DeliveryDate: Date
}