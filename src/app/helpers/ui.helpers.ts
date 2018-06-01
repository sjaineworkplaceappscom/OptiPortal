//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import * as $ from "jquery";

export  class UIHelper{

    // start sidebar and right panel manage
    // this function will call only for desktop and ipad
    public static  manageNavigationPanel():void{
        ;    
        document.getElementById('sidebarCollapse').onclick = function() {
        if(UIHelper.isMobile()==false){ 
            document.getElementById('opti_LeftPanelID').classList.toggle('opti_sidebar-minimize');  
            document.getElementById('opti_RightPanelID').classList.toggle('opti_sidebar-minimize');
        }else{
            document.getElementById('opti_LeftPanelID').classList.toggle('opti_menusidebar-mobile-open');  
            document.getElementById('opti_RightPanelID').classList.toggle('opti_menusidebar-mobile-open');
        }
        };  
    }


    public static isMobile():boolean{
        let isMobile:boolean;
        let getDeviceWidth = window.outerWidth;
        let getDeviceHeight = window.outerHeight;
        if(getDeviceWidth <= 767){
        isMobile = true; 
        }else{
        isMobile = false; 
        }
        return isMobile;
    }


    // Apply Theme CSS FILE
    public static manageThemeCssFile(){
        $(document).ready(function(){
            
            $('#opal').click(function (){
                $('footer').find('link.opti__theme-css-file').remove();
                $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo_custom_blue_opal.css?v= ' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
            });

            // $('#bootstrap').click(function (){
            //     $('footer').find('link.opti__theme-css-file').remove();
            //     $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo.custom.bootstrap.v3.css?v= ' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
            // });

            $('#urban').click(function (){
                $('footer').find('link.opti__theme-css-file').remove();
                $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo_custom_urban.css?v= ' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
            });

            $('#skype').click(function (){
                $('footer').find('link.opti__theme-css-file').remove();
                $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo_custom_skype.css?v= ' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
            });


            
        });
    }


}