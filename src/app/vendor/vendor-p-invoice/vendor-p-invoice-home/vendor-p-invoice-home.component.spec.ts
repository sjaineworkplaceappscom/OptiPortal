import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceHomeComponent } from './vendor-p-invoice-home.component';

describe('VendorPInvoiceHomeComponent', () => {
  let component: VendorPInvoiceHomeComponent;
  let fixture: ComponentFixture<VendorPInvoiceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
