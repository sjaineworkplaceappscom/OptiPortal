import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceNotesComponent } from './vendor-p-invoice-notes.component';

describe('VendorPInvoiceNotesComponent', () => {
  let component: VendorPInvoiceNotesComponent;
  let fixture: ComponentFixture<VendorPInvoiceNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
