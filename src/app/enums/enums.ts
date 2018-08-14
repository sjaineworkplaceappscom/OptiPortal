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
    Sales = 2
}

export enum ComponentName {
    // Purchase
    AddInquery = 101,
    UpdateInquery = 102,
    AddInqueryItem=103,
    

    // Sales
    UpdateSales=201

    
}
