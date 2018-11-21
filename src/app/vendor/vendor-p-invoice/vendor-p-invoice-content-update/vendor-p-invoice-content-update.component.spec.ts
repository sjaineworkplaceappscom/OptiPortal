import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceContentUpdateComponent } from './vendor-p-invoice-content-update.component';

describe('VendorPInvoiceContentUpdateComponent', () => {
  let component: VendorPInvoiceContentUpdateComponent;
  let fixture: ComponentFixture<VendorPInvoiceContentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceContentUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceContentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
