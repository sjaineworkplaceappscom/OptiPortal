//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { data2 } from '../../DemoData/Data2';
import { data } from '../../DemoData/Data';



import { process, State } from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { opticonstants } from '../../constants';
import { stringify } from '@angular/core/src/util';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import {TempPurchaseInquiryItemModel} from '../../tempmodels/temppurchase-inquiry-item';

//declare var $: any;

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
    approveUser: boolean;
    isMobile: boolean;
    isColumnFilter: boolean = false;
    isColumnFilterItemsGrid: boolean = false;
    isFixedRightSection: boolean;
    selectedThemeColor: string = opticonstants.DEFAULTTHEMECOLOR;

    noteTextForEdit = '';
    addnotestring = '';
    noteItemsData: any[];
    noteRequetData: any[];
    selectedNote:any={};
    selectedItemNote:any={};
    systemAdmin:string;


    @ViewChild('AddItemFormSection') AddItemFormSection;
    @ViewChild('showItemButtonSection') showItemButtonSection;
    @ViewChild('gridSectionItem') gridSectionItem;

    @ViewChild('notesgrid') notesgrid;
    @ViewChild('noteform') noteform;
    @ViewChild('editnoteform') editnoteform;
    

    @ViewChild('notesitemgrid') notesitemgrid;
    @ViewChild('noteitemform') noteitemform;
    @ViewChild('edititemnoteform') edititemnoteform;
    
    


    constructor(private commonService: Commonservice) {
        this.approveUser = false;
    }
    

    // tab function
    openTab(evt, tabName) {
        UIHelper.customOpenTab(evt, tabName);
    }

    public position: string = 'top';

    gridHeight: number;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // apply grid height
        this.gridHeight = UIHelper.getMainContentHeight();

        // apply width on opti_TabID
        UIHelper.getWidthOfOuterTab();

        // apply grid height
        this.gridHeight = UIHelper.getMainContentHeight();
 
        // check mobile device
        this.isMobile = UIHelper.isMobile();
    }

    ngOnInit() {

        this.commonService.themeCurrentData.subscribe(
            data => {
                this.selectedThemeColor = data;
            }
        );
        this.systemAdmin=localStorage.getItem('SystemAdmin');  
        this.noteRequetData = JSON.parse(localStorage.getItem("setRequestDynamicNotes"));
        this.noteItemsData = JSON.parse(localStorage.getItem("setItemsDynamicNotes"));

        
        // apply width on opti_TabID
        UIHelper.getWidthOfOuterTab();

        // apply grid height
        this.gridHeight = UIHelper.getMainContentHeight();

        // check mobile device
        this.isMobile = UIHelper.isMobile();

        // remove all class from Body
        const element = document.getElementsByTagName("body")[0];
        element.className = "";

        this.approveUser = false;
        this.commonService.currentNavigatedData.subscribe(
            data => {
                this.approveUser = data;
            }
        )
    }

    public roles: Array<{ text: string, value: string }> = [
        { text: "Please Select Role", value: '0' },
        { text: "Admin", value: '41F23977-C709-4B7C-BBEE-16A539211E9C' },
        { text: "Manager", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EA' },
        { text: "User", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EB' }
    ];

    public selectedItem: { text: string, value: string } = this.roles[0];

    open() {
        alert('hi ho');
    }

    
    //public gridData: any[] = this.customers;

    public gridData: any[] = data2;


    // itmes json start
    public gridItemsData: any[] = data;

    showItemSection() {
        this.purchaseItemsModelForUpdate = new TempPurchaseInquiryItemModel();
        console.log("item plus click");
        this.gridSectionItem.nativeElement.style.display = 'none';
        this.AddItemFormSection.nativeElement.style.display = 'block';
    }

    addItemt() {
        this.gridSectionItem.nativeElement.style.display = 'block';
        this.AddItemFormSection.nativeElement.style.display = 'none';
    }

    closeItemForm() {
        this.gridSectionItem.nativeElement.style.display = 'block';
        this.AddItemFormSection.nativeElement.style.display = 'none';
    }
    // items json end

    // show and hide right content section
    openRightSection(status) {
        this.purchaseInquiryForUpdate = new TempPurchaseInquiryModel();
        console.log('called open right section');
        this.isFixedRightSection = status;
    }

    closeRightSection(status) {
        this.isFixedRightSection = status;
    }

    // add top section

    // status section
    public status: Array<{ text: string, value: string }> = [
        { text: "Draft ", value: '0' },
        { text: "New ", value: '1' },
        { text: "Revised", value: '2' },
        { text: "Approved ", value: '3' },
        { text: "Partial Approved ", value: '4' },
        { text: "Rejected ", value: '5' },
        { text: "Canceled  ", value: '6' },
        { text: "Closed   ", value: '7' }
    ];
    public selectedStatusItem: { text: string, value: string } = this.status[2];

    //cretaed date
    public valueCreatedDate: Date = new Date(2000, 2, 10);

    //created By
    public valueCreatedBy: Date = new Date(2000, 2, 10);

    // valid untill
    public valueValidUntill: Date = new Date(2000, 2, 10);

    // file upload
    uploadAttachementMasterSaveUrl = 'saveMasterAttachementUrl'; // should represent an actual API endpoint
    uploadAttachementMasterRemoveUrl = 'removeMasterAttachementUrl'; // should represent an actual API endpoint

    uploadNotesMasterSaveUrl = 'saveMasterNotesUrl'; // should represent an actual API endpoint
    uploadNotesMasterRemoveUrl = 'removeMasterNotesUrl'; // should represent an actual API endpoint

    uploadAttachementItemSaveUrl = 'saveMasterAttachementUrl'; // should represent an actual API endpoint
    uploadAttachementItemRemoveUrl = 'removeMasterAttachementUrl'; // should represent an actual API endpoint

    uploadNotesItemSaveUrl = 'saveItemNotesUrl'; // should represent an actual API endpoint
    uploadNotesItemRemoveUrl = 'removeItemNotesUrl'; // should represent an actual API endpoint

    // Notes tab start
    // notesItemList = [
    //     {
    //         'NoteId' : '1',   
    //         'CreatedBy' : "Prashant1",        
    //         'Action' : "Created",
    //         'Quantitiy' : 5,
    //         'Date' : new Date(2000, 2, 10),
    //         'Notes' : "Hello hi how are you"
    //     },
    //     {
    //         'NoteId' : '2',   
    //         'CreatedBy' : "Prashant2",        
    //         'Action' : "Created",
    //         'Quantitiy' : 5,
    //         'Date' : new Date(2000, 2, 10),
    //         'Notes' : "I'm gud and you?"
    //     },
    //     {
    //         'NoteId' : '3',   
    //         'CreatedBy' : "Prashant3",        
    //         'Action' : "Created",
    //         'Quantitiy' : 5,
    //         'Date' : new Date(2000, 2, 10),
    //         'Notes' : "I'm also fine"
    //     },
    //     {
    //         'NoteId' : '5',   
    //         'CreatedBy' : "Prashant4",        
    //         'Action' : "Created",
    //         'Quantitiy' : 5,
    //         'Date' : new Date(2000, 2, 10),
    //         'Notes' : "that's great"
    //     }
    //  ];
    //public noteRequetData: any[] = this.notesItemList;

    addNewComment() {
        this.notesgrid.nativeElement.style.display = 'none';
        this.noteform.nativeElement.style.display = 'block';
    }

    deleteNote({sender,rowIndex,dataItem}){           
        this.noteRequetData.splice(rowIndex,1);
        localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteRequetData));       
    }

    

    

    editNote({sender,rowIndex,dataItem}){        
    }

    submitNote(e, action) {
        if(action == 'add'){
            this.notesgrid.nativeElement.style.display = 'block';
            this.noteform.nativeElement.style.display = 'none';
            
            let dynamicNotesString = localStorage.getItem("setRequestDynamicNotes");
            let dynamicNotes:any[]=JSON.parse(dynamicNotesString);      

            if(dynamicNotes==undefined  || dynamicNotes.length<=0){
                dynamicNotes=[];
            }
            let date = new Date();
            let CompleteDate = date.getFullYear() +'/'+ date.getMonth() +'/'+ date.getDate();
            dynamicNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteStatusItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
            localStorage.setItem("setRequestDynamicNotes", JSON.stringify(dynamicNotes));
            this.noteRequetData = dynamicNotes;
        }else{
            this.notesgrid.nativeElement.style.display = 'block';
            this.noteform.nativeElement.style.display = 'none';
        }
        this.addnotestring='';
    }

    submitItemsNote(e, action) {
        if(action == 'add'){
            this.notesitemgrid.nativeElement.style.display = 'block';
            this.noteitemform.nativeElement.style.display = 'none';
            
            let dynamicItemsNotesString = localStorage.getItem("setItemsDynamicNotes");
            let dynamicItemsNotes:any[]=JSON.parse(dynamicItemsNotesString);      

            if(dynamicItemsNotes==undefined  || dynamicItemsNotes.length<=0){
                dynamicItemsNotes=[];
            }

            let date = new Date();
            let CompleteDate = date.getFullYear() +'/'+ date.getMonth() +'/'+ date.getDate();
            dynamicItemsNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteStatusItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
            localStorage.setItem("setItemsDynamicNotes", JSON.stringify(dynamicItemsNotes));
            this.noteItemsData = dynamicItemsNotes;
        }else{
            this.notesitemgrid.nativeElement.style.display = 'block';
            this.noteitemform.nativeElement.style.display = 'none';
        }
        this.addnotestring='';
    }

    addNewItemNotes() {
        this.notesitemgrid.nativeElement.style.display = 'none';
        this.noteitemform.nativeElement.style.display = 'block';
    }

    deleteItemsNote({sender,rowIndex,dataItem}){           
        this.noteItemsData.splice(rowIndex,1);
        localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteItemsData));       
    }

    editItemsNotes(e, note) {
        console.log(e);
        console.log(note);
        this.notesitemgrid.nativeElement.style.display = 'none';
        this.edititemnoteform.nativeElement.style.display = 'block';
        this.selectedItemNote=note;                
    }

    updateItemNote(e,note:any) {
        this.notesitemgrid.nativeElement.style.display = 'block';
        this.edititemnoteform.nativeElement.style.display = 'none';
        
       let index=this.noteRequetData.indexOf(this.selectedItemNote);
       if(index>-1){
           this.noteItemsData[index].Notes=note.value;
       }
        
    }

    purchaseInquiryForUpdate:TempPurchaseInquiryModel = new  TempPurchaseInquiryModel();
   /**
    * Method will open the edit item window for selected grid item.
    * @param gridItem 
    * @param selection 
    * @param status 
    */
   public gridDataSelectionChange(gridItem, selection,status) {
        //update ui properties.
        this.isFixedRightSection = status;    
        //fatch and parse row value.
        let selectedItem = gridItem.data.data[selection.index];
        const selectedData = selection.selectedRows[0].dataItem;
        //  console.log("data: selectedData::"+  JSON.stringify(selectedData));
        //  console.log("data: selectedItem::"+    JSON.stringify(selectedItem));
        this.purchaseInquiryForUpdate = JSON.parse(JSON.stringify(selectedData));
        //console.log("data: From model::"+    JSON.stringify(this.purchaseInquiryForUpdate));
    }

    purchaseItemsModelForUpdate:TempPurchaseInquiryItemModel =new TempPurchaseInquiryItemModel();
    /**
     * Method will open the edit item window for selected grid item.
     * @param gridItemsData 
     * @param selection 
     * @param status 
     */
    public gridItemsDataSelectionChange(gridItemsData, selection,status) {
        
        //update ui properties.
        this.gridSectionItem.nativeElement.style.display = 'none';
        this.AddItemFormSection.nativeElement.style.display = 'block';

        //fatch and parse row value.
        let selectedItem = gridItemsData.data.data[selection.index];
        const selectedData = selection.selectedRows[0].dataItem;
        this.isFixedRightSection = status;
        // console.log("data: selectedData::"+  JSON.stringify(selectedData));
        // console.log("data: selectedItem::"+    JSON.stringify(selectedItem));
        this.purchaseItemsModelForUpdate = JSON.parse(JSON.stringify(selectedData));
       
        
    }
    
   editNotes(e, note) {
        console.log(e);
        console.log(note);
        this.notesgrid.nativeElement.style.display = 'none';
        this.editnoteform.nativeElement.style.display = 'block';
        this.selectedNote=note;                
   }

    

    

    updateNote(e) {
        this.notesgrid.nativeElement.style.display = 'block';
        this.editnoteform.nativeElement.style.display = 'none';
        
       let index=this.noteRequetData.indexOf(this.selectedNote);
       if(index>-1){
           this.noteRequetData[index].Notes=this.selectedNote.Notes;
       }
        
    }

    public noteStatus: Array<{ text: string, value: string }> = [
        { text: "General ", value: '0' },
        { text: "Rejected", value: '1' },
        { text: "Parcial accepted", value: '2' },
    ];
    public selectedNoteStatusItem: { text: string, value: string } = this.noteStatus[0];

    //editNotes

}
