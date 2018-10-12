

export enum UserType {
    /// <summary>
    /// No Type.
    /// </summary>
    None = 0,
    /// <summary>
    /// Enum to represent User.
    /// </summary>
    User = 1,
    /// <summary>
    /// Enum to represent Customer.
    /// </summary>
    Customer = 2,
    /// <summary>
    /// Enum to represent Vendor.
    /// </summary>
    Vendor = 3,
    /// <summary>
    /// Enum to represent SuperAdmin.
    /// </summary>
    SuperAdmin = 4
}

export  enum ModuleName {
    Purchase = 1,
    Sales = 2,
    SalesOrder = 4,
    DeliveryNotes = 5,
    OpenInvoices = 6,
    CustomerContracts=7,
    CustomerContacts=8,
    CustomerPurchaseOrder=9

}

export enum ComponentName {
    // Purchase
    AddInquery = 101,
    UpdateInquery = 102,
    AddInqueryItem=103,
    

    // Sales Quotations
    UpdateSales=201,

    // Sales Order
    SalesOrderDetail = 401,

    // Delivery Notes
    DeliveryNotes = 501,

    // Open Invoices
    OpenInvoices = 601,

    // Customer Contacts
    AddContact = 801,
    UpdateContact = 802,

    
    CPOUpdate=901,
    CPOAdd=902    
}


export enum CustomerEntityType
{
/// <summary>
/// Customer Type entity.
/// </summary>
Customer = 1,

/// <summary>
/// Purchase Inquiry type.
/// </summary>
PurchaseInquiry = 2,

/// <summary>
/// Purchase Inquiry Item type.
/// </summary>
PurchaseInquiryItem = 3,

SalesQuotation = 4,

SalesOrder = 5,

DeliveryNotes = 6,

AdvanceShipmentNote = 7,

OpenInvoice = 8,

CustomerPurchaseOrder = 9,

}


export enum EntityType
{
/// <summary>
/// Tenanat Type entity.
/// </summary>
Tenant = 1,
/// <summary>
/// User Type entity.
/// </summary>
User = 2,
/// <summary>
/// NotificationQueue Type entity.
/// </summary>
NotificationQueue = 3,

/// <summary>
/// Contact Type entity.
/// </summary>
Contact = 4,

/// <summary>
/// Note Type Entity
/// </summary>
Note = 5,

/// <summary>
/// Note Linking Type Entity
/// </summary>
NoteLinking = 6,

/// <summary>
/// Attachment Linking Type Entity
/// </summary>
AttachmentLinking = 7,

/// <summary>
/// Attachment Type Entity
/// </summary>
Attachment = 8
}

export enum NoteType
{
/// <summary>
/// No operatoin is performed.
/// </summary>
None = 0,
/// <summary>
/// Enum to represent Normal Note.
/// </summary>
Normal = 1,
/// <summary>
/// Enum to represent Rejected Note.
/// </summary>
Rejected = 2,
/// <summary>
/// Enum to represent Partially accepted note
/// </summary>
PartialApproved = 3
}

export enum PurchaseInquiryStatus
{

Draft = 1,
New = 2,
Revised = 3,
Approved = 4,
PartialApproved = 5,
Rejected = 6,
Cancelled = 7,
Closed = 8,
Updated = 9
}
export enum CPOReferenceType{
    PurchaseOrder = 1,
    Agreement = 2
}

export enum PurchaseInquiryItemStatus
{

New = 1,
Updated = 2,
Cancelled = 3,

}

export enum OperationType
{

add = 1,
Update = 2,

}
