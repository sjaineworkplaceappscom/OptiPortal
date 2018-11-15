import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceUpdateComponent } from './vendor-p-invoice-update.component';

describe('VendorPInvoiceUpdateComponent', () => {
  let component: VendorPInvoiceUpdateComponent;
  let fixture: ComponentFixture<VendorPInvoiceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
