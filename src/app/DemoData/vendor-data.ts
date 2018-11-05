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