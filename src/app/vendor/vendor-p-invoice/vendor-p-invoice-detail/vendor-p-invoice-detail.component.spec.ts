import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceDetailComponent } from './vendor-p-invoice-detail.component';

describe('VendorPInvoiceDetailComponent', () => {
  let component: VendorPInvoiceDetailComponent;
  let fixture: ComponentFixture<VendorPInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
