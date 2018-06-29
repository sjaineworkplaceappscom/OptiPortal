//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { data2 } from '../../DemoData/Data2';

import { process, State } from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { opticonstants } from '../../constants';


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


    @ViewChild('AddItemFormSection') AddItemFormSection;
    @ViewChild('showItemButtonSection') showItemButtonSection;
    @ViewChild('gridSectionItem') gridSectionItem;

    @ViewChild('notesgrid') notesgrid;
    @ViewChild('noteform') noteform;
    @ViewChild('editnoteform') editnoteform;


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
    }

    ngOnInit() {
        this.noteItemsData = JSON.parse(localStorage.getItem("setDynamicNotes"));
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
    PurchaseEnquiryItemList = [
        {
            'PurchaseInquiryItemlId': '1',
            'ItemDescription': "top board item id123",
            'CustomerItemIdOrDescription': "top board item id123",
            'Quantitiy': 5,
            'Unit': "number",
            'Requester': "Ankur Sharma",
            'RequestDate': "20/06/2018",
            'RequiredDate': "28/06/2018",
            'ShipToLocation': "Indore"
        },
        {
            'PurchaseInquiryItemlId': '2',
            'ItemDescription': "top board item id123",
            'CustomerItemIdOrDescription': "top board item id123",
            'Quantitiy': 5,
            'Unit': "number",
            'Requester': "Ankur Sharma",
            'RequestDate': "20/06/2018",
            'RequiredDate': "28/06/2018",
            'ShipToLocation': "Indore"
        },
        {
            'PurchaseInquiryItemlId': '3',
            'ItemDescription': "top board item id123",
            'CustomerItemIdOrDescription': "top board item id123",
            'Quantitiy': 5,
            'Unit': "number",
            'Requester': "Ankur Sharma",
            'RequestDate': "20/06/2018",
            'RequiredDate': "28/06/2018",
            'ShipToLocation': "Indore"
        },
        {
            'PurchaseInquiryItemlId': '4',
            'ItemDescription': "top board item id123",
            'CustomerItemIdOrDescription': "top board item id123",
            'Quantitiy': 5,
            'Unit': "number",
            'Requester': "Ankur Sharma",
            'RequestDate': "20/06/2018",
            'RequiredDate': "28/06/2018",
            'ShipToLocation': "Indore"
        }
    ];
    public gridItemsData: any[] = this.PurchaseEnquiryItemList;

    showItemSection() {
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
    //public noteItemsData: any[] = this.notesItemList;

    addNewComment() {
        this.notesgrid.nativeElement.style.display = 'none';
        this.noteform.nativeElement.style.display = 'block';
    }



    submitNote(e) {
        this.notesgrid.nativeElement.style.display = 'block';
        this.noteform.nativeElement.style.display = 'none';
        
        let dynamicNotesString = localStorage.getItem("setDynamicNotes");
        let dynamicNotes:any=JSON.parse(dynamicNotesString);      

        dynamicNotes.push({ Notes: this.addnotestring, NotesStatus: this.selectedNoteStatusItem.text, Date: new Date(), CreatedBy: 'prashant' });
        localStorage.setItem("setDynamicNotes", JSON.stringify(dynamicNotes));
        this.noteItemsData = dynamicNotes;

        //console.log(dynamicNotes);
    }

    deleteNotes(e){
        console.log(e.rowIndex);
        //console.log(e);
    }




    editNotes(e, note) {
        console.log(e);
        console.log(note);
        this.notesgrid.nativeElement.style.display = 'none';
        this.editnoteform.nativeElement.style.display = 'block';
        this.noteTextForEdit = note;
    }

    updateNote(e) {
        this.notesgrid.nativeElement.style.display = 'block';
        this.editnoteform.nativeElement.style.display = 'none';
    }

    public noteStatus: Array<{ text: string, value: string }> = [
        { text: "General ", value: '0' },
        { text: "Private", value: '1' },
    ];
    public selectedNoteStatusItem: { text: string, value: string } = this.noteStatus[0];

    //editNotes

}
