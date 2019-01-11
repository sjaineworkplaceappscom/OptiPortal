export class Configuration {    
    public static baseServerAPIEndpoint ="http://172.16.6.139:9090/"; // "http://172.16.6.139:9090/";//""http://139.144.10.218:9090/";    //"http://139.144.10.218:8080/";
    public static firstHomePage = "/home/dashboard";
    public static firstHomePageVendor = "/home/vendor/vpinquery";
    public static dateFormat = 'DD MMM YY';
    public static displayDateFormat = 'dd MMM yy' 
    public static appVersion = '1.4';
    public static doccumentPath = "http=//139.144.10.218:5000/Upload/";
    public static assetsRootpath = "assets"
    public static imagePath = Configuration.assetsRootpath + "/images";
    public static themePath = Configuration.assetsRootpath + "/css/theme";


    public static getDisplayDateFormat(forKendoGridColumn:boolean=false): string {
        if(forKendoGridColumn)
        return "{0: " + Configuration.displayDateFormat + "}";

        return Configuration.displayDateFormat; 
    }
}