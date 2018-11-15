import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceContentComponent } from './vendor-p-invoice-content.component';

describe('VendorPInvoiceContentComponent', () => {
  let component: VendorPInvoiceContentComponent;
  let fixture: ComponentFixture<VendorPInvoiceContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
