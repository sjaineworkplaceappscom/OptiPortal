import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceAttachmentComponent } from './vendor-p-invoice-attachment.component';

describe('VendorPInvoiceAttachmentComponent', () => {
  let component: VendorPInvoiceAttachmentComponent;
  let fixture: ComponentFixture<VendorPInvoiceAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
