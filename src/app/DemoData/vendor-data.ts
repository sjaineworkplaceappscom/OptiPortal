// Home tab
export const vpiList = [  
    {  
        "InquiryID":"V0001",
        "InquiryDate":"01/07/2018",
        "Vendor":"Samsung",
        "Status":"New",
        "Buyer":"Shashank Jain"
    }
 ,  
    {  
        "InquiryID":"V0002",
        "InquiryDate":"01/07/2018",
        "Vendor":"Samsung",
        "Status":"Sent To Vendor",
        "Buyer":"Shashank Jain"
    }
]

// Header Tab
export const vpiHome = [  
    {  
        "InquiryID":"V0002",
        "InquiryDate":"01/07/2018",
        "Vendor":"Samsung",
        "Status":"Sent To Vendor",
        "Buyer":"Shashank Jain",
        "ValidUntil":"01/07/2018"
    }
 ,  
    {  
        "InquiryID":"V0002",
        "InquiryDate":"01/07/2018",
        "Vendor":"Samsung",
        "Status":"New",
        "Buyer":"Shashank Jain",
        "ValidUntil":"01/07/2018"
    }
]


// Content Tab
export const vpiContent = [  
    {  
        "LineNumber":"V0002",
        "RequestedDate":"01/07/2018",
        "Item":"Samsung",
        "Quantity":10,
        "UOM":"UOM",
        "ShipToAddress":"Indore",
        "BillToAddress":"Indore" 
    }
 ,  
    {  
        "LineNumber":"V0002",
        "RequestedDate":"01/07/2018",
        "Item":"Samsung",
        "Quantity":10,
        "UOM":"UOM",
        "ShipToAddress":"Indore",
        "BillToAddress":"Indore" 
    }
]

// Attchement tab
export const vpiAttachment = [  
    {  
        "AttachmentName":"Report1.png",
        "SizeInKb":"10KB",
        "AttachmentTypeText":"PNG",
        "CreatedByName":"Prashant"
    }
 ,  
    {  
        "AttachmentName":"Report2.png",
        "SizeInKb":"15KB",
        "AttachmentTypeText":"PNG",
        "CreatedByName":"Prashant"
    }
]


// Notes
export const vpiNotes = [  
    {  
        "CreatedByName":"prashant",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
 ,  
    {  
        "CreatedByName":"Ankur",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
]


///////////////////////vendor purchase order list////////////////
export const vpoList = [  
    {  
        "POID":"V0001",
        "Vendor":"Samsung",
        "PODate":"01/07/2018",
        "DUEDate":"01/07/2018",
        "Ack":"New",
        "Buyer":"Shashank Jain"
    }
 ,  
    {  
        "POID":"V0002",
        "Vendor":"Samsung",
        "PODate":"01/07/2018",
        "DUEDate":"01/07/2018",
        "Ack":"New",
        "Buyer":"Shashank Jain"
    }
]

export const vpoHome = [  
    {  
        "POID":"V0001",
        "Vendor":"Samsung",
        "PODate":"01/07/2018",
        "DUEDate":"01/07/2018",
        "Status":"New",
        "Ack":"Yes",
        "Buyer":"Shashank Jain",
        "Price":4000,
        "Tax":10,
        "Freight":10,
        "Discount":400,
        "TotalPrice":3600
    }
 ,  
    {  
        "POID":"V0002",
        "Vendor":"Samsung",
        "PODate":"01/07/2018",
        "DUEDate":"01/07/2018",
        "Status":"New",
        "Ack":"Yes",
        "Buyer":"Shashank Jain",
        "Price":4000,
        "Tax":10,
        "Freight":10,
        "Discount":400,
        "TotalPrice":3600
    }
]

export const vpoContent = [  
    {  
        "LineNumber":"V0001",
        "Item":"Samsung",
        "Quantity":10,
        "UnitPrice":4000,
        "UOM":"UOM",
        "TotalPrice":4000,
        "TaxCode":"Code1",
        "ShipToAddress":"Indore",
        "BillToAddress":"Indore" ,
        "RequestedDate":"01/07/2018", 
    }
 ,  
    {  
        "LineNumber":"V0002",
        "Item":"Samsung",
        "Quantity":10,
        "UnitPrice":4000,
        "UOM":"UOM",
        "TotalPrice":4000,
        "TaxCode":"Code1",
        "ShipToAddress":"Indore",
        "BillToAddress":"Indore" ,
        "RequestedDate":"01/07/2018",
    }
]

/////////////////////////////
// vendor payments
/////////////////////////////
export const paymentsList = [
    {
        'PaymentRef':'1', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'2', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'3', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'4', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    }
]

export const paymentsHeader = [
    {
        'PaymentRef':'1', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'2', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'3', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    },
    {
        'PaymentRef':'4', 
        'PaymentMode':'Cheque', 
        'PaymentType': 'Advance', 
        'PaymentDetails': 'Bank', 
        'Amount':5000, 
        'PaymentDate':'01/07/2018', 
        'Status':'Status'  
    }
]

export const paymentAttachment = [  
    {  
        "AttachmentName":"Report1.png",
        "SizeInKb":"10KB",
        "AttachmentTypeText":"PNG",
        "CreatedByName":"Prashant"
    }
 ,  
    {  
        "AttachmentName":"Report2.png",
        "SizeInKb":"15KB",
        "AttachmentTypeText":"PNG",
        "CreatedByName":"Prashant"
    }
]

export const paymentNotes = [  
    {  
        "CreatedByName":"prashant",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
 ,  
    {  
        "CreatedByName":"Ankur",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
]

export const paymentsContents = [
    {
        'Line':"1", 
        'PORef':"2", 
        'Invoice':"3", 
        'InvoiceLine':"4", 
        'Item':"item1", 
        'Quantity':"10", 
        'UnitPrice':"1500", 
        'UOM':"UOM", 
        'TotalPrice':"5000", 
        'TaxCode':"Tax1", 
        'ShipToAddress':"Indore", 
        'BillToAddress':"Indore", 
        'Shipment':"1", 
        'DeliveryDate':"05/07/2018"
    },
    {
        'Line':"2", 
        'PORef':"2", 
        'Invoice':"3", 
        'InvoiceLine':"4", 
        'Item':"item1", 
        'Quantity':"10", 
        'UnitPrice':"1500", 
        'UOM':"UOM", 
        'TotalPrice':"5000", 
        'TaxCode':"Tax1", 
        'ShipToAddress':"Indore", 
        'BillToAddress':"Indore", 
        'Shipment':"1", 
        'DeliveryDate':"05/07/2018"
    }
]


/////////////////vendor Invoices/////////////
export const vendorInvoiceList = [
    {
        'Invoice':"1", 
        'PORef':"2", 
        'Vendor':"3", 
        'InvoiceDate':"05/07/2018", 
        'InvoiceAmount':"item1", 
        'PaymentDueDate':"05/07/2018", 
        'Status':"1500"
    },
    {
        'Invoice':"1", 
        'PORef':"2", 
        'Vendor':"3", 
        'InvoiceDate':"05/07/2018", 
        'InvoiceAmount':"item1", 
        'PaymentDueDate':"05/07/2018", 
        'Status':"1500"
    }
]

export const vendorInvoiceHeader = [
    {
        'Invoice':"1", 
        'PORef':"2", 
        'Vendor':"3", 
        'InvoiceDate':"05/07/2018", 
        'InvoiceAmount':"item1", 
        'PaymentDueDate':"05/07/2018", 
        'Status':"1500"
    },
    {
        'Invoice':"1", 
        'PORef':"2", 
        'Vendor':"3", 
        'InvoiceDate':"05/07/2018", 
        'InvoiceAmount':"item1", 
        'PaymentDueDate':"05/07/2018", 
        'Status':"1500"
    }
]

export const invoiceAttachment = [  
    {  
        "FileName":"Report1.png",
        "FileSize":"10KB",
        "AttachmentType":"Document",
        "CreatedBy":"CVP test user",
        "Reference":"item1" 
    }
 ,  
    {  
        "FileName":"Report2.png",
        "FileSize":"10KB",
        "AttachmentType":"Document",
        "CreatedBy":"CVP test user",
        "Reference":"item1" 
    }
]

export const invoiceNotes = [  
    {  
        "CreatedByName":"prashant",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
 ,  
    {  
        "CreatedByName":"Ankur",
        "CreatedDate":"05/07/2018",
        "Notes":"This is note"
    }
]



export const invoiceContent = [
    {
        'Line': 1,
        'PORef': 2,
        'Item': 'item1',
        'Quantity': 5,
        'UnitPrice': 5,
        'UOM': 5,
        'TotalPrice': 5,
        'TaxCode': 'tax code 1',
        'ShipToAddress':'Indore',
        'BillToAddress':'Indore',
        'Shipment': 10,
        'DeliveryDate':'05/07/2018'
    },
    {
        'Line': 2,
        'PORef': 2,
        'Item': 'item1',
        'Quantity': 5,
        'UnitPrice': 5,
        'UOM': 5,
        'TotalPrice': 5,
        'TaxCode': 'tax code 1',
        'ShipToAddress':'Indore',
        'BillToAddress':'Indore',
        'Shipment': 10,
        'DeliveryDate':'05/07/2018'
    }
]